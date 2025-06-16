from models.enrollments import Enrollment, RequestEnrollment, AddProgress, Comment
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
from lib.email_service import send_email
from datetime import datetime, timezone

async def create_enrollment(enrollment: Enrollment) -> ServiceResponse:

    mdb_result = (
        await get_database()
        .get_collection("enrollment")
        .find_one(
            {"student_id": enrollment.student_id, "course_id": enrollment.course_id},
            {
                "id": {"$toString": "$_id"},
            },
        )
    )
    if mdb_result:
        return ServiceResponse(data={"enrollment_id": mdb_result["id"]})

    course_bson = validate_bson_id(enrollment.course_id)
    if not course_bson:
        return ServiceResponse(
            success=False, msg="couln't find course", status_code=409
        )

    course = (
        await get_database()
        .get_collection("course")
        .find_one({"_id": course_bson}, {"number_of_enrollments": 1})
    )
    if not course:
        return ServiceResponse(
            success=False, msg="couln't find course", status_code=409
        )

    else:
        await get_database().get_collection("course").update_one(
            {"_id": course_bson},
            {"$set": {"number_of_enrollments": course["number_of_enrollments"] + 1}},
        )

    mdb_result = (
        await get_database()
        .get_collection("enrollment")
        .insert_one(enrollment.model_dump())
    )
    enrollment_id = str(mdb_result.inserted_id)
    if enrollment_id:
        return ServiceResponse(data={"enrollment_id": enrollment_id})
    return ServiceResponse(success=False, msg="couln't add enrollment", status_code=409)


async def delete_enrollment(enrollment_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(enrollment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad enrollment ID")

    result = (
        await get_database().get_collection("enrollment").delete_one({"_id": bson_id})
    )
    if not result.deleted_count:
        return ServiceResponse(
            success=False, status_code=404, msg="enrollment not Found"
        )
    return ServiceResponse(mag="OK")


async def update_enrollment(enrollment_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(enrollment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad enrollment ID")

    enrollment_model_fields = set(Enrollment.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(enrollment_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid enrollment Update Keys")

    result = (
        await get_database()
        .get_collection("enrollment")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=404, msg="enrollment not Found"
        )
    return ServiceResponse(msg="OK")


async def get_enrollment(course_id: str, user_id: str) -> ServiceResponse:
    enrollment = (
        await get_database()
        .get_collection("enrollment")
        .find_one(
            {"student_id": str(user_id), "course_id": course_id},
            {"_id": 0, "id": {"$toString": "$_id"}, "progress": 1, "is_completed": 1, 'end_date': 1},
        )
    )
    if enrollment and (not enrollment['end_date'] or datetime.strptime(enrollment['end_date'], "%Y-%m-%d") >= datetime.now().utcnow()):
        return ServiceResponse(data={"enrollment": enrollment})

    all_subscriptions = await get_database().get_collection('subscription').find({'user_id':user_id}).to_list(length=None)

    if not (all_subscriptions and len(all_subscriptions) > 0):
        return ServiceResponse(
            success=False, status_code=404, msg="enrollment Not Found"
        )
    

    for sub in all_subscriptions:
        sub_plan = await get_database().get_collection('subscription_plan').find_one({'_id':validate_bson_id(sub['subscription_plan_id'])})
        program = await get_database().get_collection('program').find_one({
            "_id": validate_bson_id(sub_plan['program_id']),
            "tracks": {
                "$elemMatch": {
                    "id": int(sub_plan['track_id']),
                    "$or": [
                        {"courses": course_id},
                        {"levels.courses": course_id}
                    ]
                }
            }
        })
        if program and datetime.strptime(sub['end_date'], "%Y-%m-%d") >= datetime.now().utcnow():
            new_enrollment = Enrollment(student_id=user_id, course_id=course_id, end_date=sub['end_date'])
            mdb_result = await get_database().get_collection('enrollment').insert_one(new_enrollment.model_dump())
            if mdb_result.inserted_id:
                return ServiceResponse(data={"enrollment_id": str(mdb_result.inserted_id)})

    return ServiceResponse(
        success=False, status_code=404, msg="enrollment Not Found"
    )


async def calc_completion(enrollment_id: str):
    enrollment = await get_database().get_collection('enrollment').find_one({'_id': validate_bson_id(enrollment_id)}, {'_id': 0, 'course_id': 1, 'progress': 1, 'is_completed': 1})
    course = await get_database().get_collection('course').find_one({'_id': validate_bson_id(enrollment['course_id'])}, {'_id': 0, 'chapters': 1})
    total_material_count = 0
    completed_count = 0
    for chapter in course['chapters']:
        for mat in chapter['materials']:
            total_material_count = total_material_count + 1
            if mat['type'] == 'Lesson' and enrollment.get('progress', {}).get('lessons_completed'):
                for progress in enrollment['progress']['lessons_completed']:
                    if progress['lesson_id'] == mat['Id']:
                        completed_count = completed_count + 1
                        break
            if mat['type'] == 'Activity' and enrollment.get('progress', {}).get('activities_completed'):
                for progress in enrollment['progress']['activities_completed']:
                    if progress['activity_id'] == mat['Id']:
                        completed_count = completed_count + 1
                        break
            if mat['type'] == 'Simulation' and enrollment.get('progress', {}).get('simulations_completed'):
                for progress in enrollment['progress']['simulations_completed']:
                    if progress['simulation_id'] == mat['Id']:
                        completed_count = completed_count + 1
                        break
            if mat['type'] == 'Project' and enrollment.get('progress', {}).get('projects_completed'):
                for progress in enrollment['progress']['projects_completed']:
                    if progress['project_id'] == mat['Id']:
                        completed_count = completed_count + 1
                        break
            if mat['type'] == 'Quiz' and enrollment.get('progress', {}).get('quizes_completed'):
                for progress in enrollment['progress']['quizes_completed']:
                    if progress['quiz_id'] == mat['Id']:
                        completed_count = completed_count + 1
                        break

    if total_material_count == completed_count:
        result = await get_database().get_collection('enrollment').update_one({'_id': validate_bson_id(enrollment_id)}, {'$set': {'is_completed': True}})
    else:
        result = await get_database().get_collection('enrollment').update_one({'_id': validate_bson_id(enrollment_id)}, {'$set': {'is_completed': False}})


async def get_all_enrollments(user_id: str):
    all_subscriptions = await get_database().get_collection('subscription').find({'user_id':str(user_id)}).to_list(length=None)
    print(user_id)
    if (all_subscriptions and len(all_subscriptions) > 0):
        for sub in all_subscriptions:
            sub_plan = await get_database().get_collection('subscription_plan').find_one({'_id':validate_bson_id(sub['subscription_plan_id'])})
            program = await get_database().get_collection('program').find_one({'_id':validate_bson_id(sub_plan['program_id'])})
            if not program:
                print('program not found')
                continue
            track = next((t for t in program.get("tracks", []) if t["id"] == sub_plan['track_id']), None)
            if not track:
                print('track not found')
                continue
            course_ids = set(track.get("courses", []))
            for level in track.get("levels", []):
                course_ids.update(level.get("courses", []))
            print(course_ids)

            
            for course_id in course_ids:
                enrollment = await get_database().get_collection("enrollment").find_one({"student_id": str(user_id), "course_id": course_id}, {"_id": 1, 'end_date': 1})

                if enrollment and enrollment['end_date'] == None:
                    continue
                
                if enrollment and enrollment['end_date']:
                    await get_database().get_collection('enrollment').update_one({'_id':enrollment['_id']},{'$set':{'end_date':sub['end_date']}})
                    continue

                if not enrollment:
                    new_enrollment = Enrollment(student_id=str(user_id), course_id=course_id, end_date=sub['end_date'])
                    await get_database().get_collection('enrollment').insert_one(new_enrollment.model_dump())
                    continue
                
        
    
    
    
    
    
    bson_student_id = validate_bson_id(user_id)
    if bson_student_id:
        enrollments = (
            await get_database()
            .get_collection("enrollment")
            .find(
                {"student_id": str(user_id)},
                {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "course_id": 1,
                    "progress": 1,
                    "is_completed": 1,
                },
            )
            .to_list(length=None)
        )
        for enrollment in enrollments:
            await calc_completion(enrollment['id'])

        if enrollments:
            return ServiceResponse(data={"enrollments": enrollments})
    return ServiceResponse(success=False, status_code=404, msg="enrollments Not Found")


async def get_admin_enrollments():
    enrollments = (
        await get_database()
        .get_collection("enrollment")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "course_id": 1,
                "progress": 1,
                "student_id": 1,
                "is_completed": 1,
                "created_at": 1

            },
        )
        .to_list(length=None)
    )

    if enrollments:
        return ServiceResponse(data={"enrollments": enrollments})
    return ServiceResponse(success=False, status_code=404, msg="enrollments Not Found")


async def add_progress(
    enrolment_id: str, progres: AddProgress, student_id: str
) -> ServiceResponse:
    bson_enrolment_id = validate_bson_id(enrolment_id)
    if not bson_enrolment_id:
        return ServiceResponse(
            success=False, status_code=400, msg="Enrollment Not Found 1"
        )
    result = (
        await get_database()
        .get_collection("enrollment")
        .find_one({"_id": bson_enrolment_id}, {"student_id": 1, "course_id": 1})
    )
    if not result:
        return ServiceResponse(
            success=False, status_code=400, msg="Enrollment Not Found 2"
        )
    if result["student_id"] != str(student_id):
        return ServiceResponse(success=False, status_code=400, msg="Bad User")

    course = (
        await get_database()
        .get_collection("course")
        .find_one({"_id": validate_bson_id(result["course_id"])}, {"chapters": 1})
    )

    if progres.material_type == "Lesson":
        if not progres.lesson_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Lesson Progress Is Not Accepted"
            )

        for chapter in course["chapters"]:
            for material in chapter["materials"]:
                if (
                    material["Id"] == progres.lesson_progress.lesson_id
                    and material["type"] == "Lesson"
                ):
                    result = (
                        await get_database()
                        .get_collection("enrollment")
                        .update_one(
                            {"_id": bson_enrolment_id},
                            {
                                "$push": {
                                    "progress.lessons_completed": progres.lesson_progress.model_dump()
                                }
                            },
                        )
                    )
                    if result.modified_count > 0:
                        await calc_completion(enrolment_id)
                        return ServiceResponse(msg="Lesson Progress Accepted")
        return ServiceResponse(success=False, msg="Lesson  Not Found")

    if progres.material_type == "Project":
        if not progres.project_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Project Progress Is Not Accepted"
            )

        for chapter in course["chapters"]:
            for material in chapter["materials"]:
                if (
                    material["Id"] == progres.project_progress.project_id
                    and material["type"] == "Project"
                ):
                    result = (
                        await get_database()
                        .get_collection("enrollment")
                        .update_one(
                            {"_id": bson_enrolment_id},
                            {
                                "$push": {
                                    "progress.projects_completed": progres.project_progress.model_dump()
                                }
                            },
                        )
                    )
                    if result.modified_count > 0:
                        await calc_completion(enrolment_id)
                        return ServiceResponse(msg="Project Progress Accepted")
        return ServiceResponse(success=False, msg="Project  Not Found")

    if progres.material_type == "Simulation":
        if not progres.simulation_progress:
            return ServiceResponse(
                success=False,
                status_code=400,
                msg="Simulation Progress Is Not Accepted",
            )

        for chapter in course["chapters"]:
            for material in chapter["materials"]:
                if (
                    material["Id"] == progres.simulation_progress.simulation_id
                    and material["type"] == "Simulation"
                ):
                    result = (
                        await get_database()
                        .get_collection("enrollment")
                        .update_one(
                            {"_id": bson_enrolment_id},
                            {
                                "$push": {
                                    "progress.simulations_completed": progres.simulation_progress.model_dump()
                                }
                            },
                        )
                    )
                    if result.modified_count > 0:
                        await calc_completion(enrolment_id)
                        return ServiceResponse(msg="Simulation Progress Accepted")
        return ServiceResponse(success=False, msg="Simulation  Not Found")

    if progres.material_type == "Activity":
        if not progres.activity_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Activity Progress Is Not Accepted"
            )

        for chapter in course["chapters"]:
            for material in chapter["materials"]:
                if (
                    material["Id"] == progres.activity_progress.activity_id
                    and material["type"] == "Activity"
                ):
                    result = (
                        await get_database()
                        .get_collection("enrollment")
                        .update_one(
                            {"_id": bson_enrolment_id},
                            {
                                "$push": {
                                    "progress.activities_completed": progres.activity_progress.model_dump()
                                }
                            },
                        )
                    )
                    if result.modified_count > 0:
                        await calc_completion(enrolment_id)
                        return ServiceResponse(msg="Activity Progress Accepted")
        return ServiceResponse(success=False, msg="Activity  Not Found")

    if progres.material_type == "Quiz":
        if not progres.quiz_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Quiz Progress Is Not Accepted"
            )
        for chapter in course["chapters"]:
            for material in chapter["materials"]:
                if (
                    material["Id"] == progres.quiz_progress.quiz_id
                    and material["type"] == "Quiz"
                ):

                    bson_id = validate_bson_id(progres.quiz_progress.quiz_id)

                    quiz = (
                        await get_database()
                        .get_collection("quiz")
                        .find_one({"_id": bson_id})
                    )
                    if not quiz:
                        return ServiceResponse(
                            success=False, status_code=400, msg="Bad quiz ID"
                        )

                    correct_count = 0
                    for ans in progres.quiz_progress.answers:
                        if not any(
                            [ans.question_id == q["id"] for q in quiz["questions"]]
                        ):
                            return ServiceResponse(
                                success=False, status_code=400, msg="Bad Question ID"
                            )

                        found_object = next(
                            (
                                obj
                                for obj in quiz["questions"]
                                if obj["id"] == ans.question_id
                            ),
                            None,
                        )
                        if not any(
                            [
                                ans.choice_id == choice["id"]
                                for choice in found_object["choices"]
                            ]
                        ):
                            return ServiceResponse(
                                success=False, status_code=400, msg="Bad Choice ID"
                            )
                        if ans.choice_id == found_object["correct_answer_id"]:
                            correct_count = correct_count + 1
                    progres.quiz_progress.score_prcentage = int(
                        correct_count / len(quiz["questions"]) * 100
                    )

                    result = (
                        await get_database()
                        .get_collection("enrollment")
                        .update_one(
                            {"_id": bson_enrolment_id},
                            {
                                "$push": {
                                    "progress.quizes_completed": progres.quiz_progress.model_dump()
                                }
                            },
                        )
                    )
                    if result.modified_count > 0:
                        await calc_completion(enrolment_id)
                        return ServiceResponse(msg="Quiz Progress Accepted")
        return ServiceResponse(success=False, msg="Quiz  Not Found")
    return ServiceResponse(success=False, msg="Type Not Set Priperly")


async def request_enrollment(requesr: RequestEnrollment) -> ServiceResponse:
    package_bson = validate_bson_id(requesr.course_id)
    if requesr.package_type != "course" and requesr.package_type != "plan":
        return ServiceResponse(
            success=False, msg="rejected typeof package", status_code=409
        )
    price = 0
    if requesr.package_type == "course":
        course = (
            await get_database()
            .get_collection("course")
            .find_one({"_id": package_bson}, {"_id": 0, "price": 1})
        )
        if not course:
            return ServiceResponse(
                success=False, msg="couln't find course", status_code=409
            )
        price = course["price"]
    if requesr.package_type == "plan":
        course = (
            await get_database()
            .get_collection("plan")
            .find_one({"_id": package_bson}, {"_id": 0, "price": 1})
        )
        if not course:
            return ServiceResponse(
                success=False, msg="couln't find plan", status_code=409
            )
        price = course["price"]

    discount = (
        await get_database()
        .get_collection("promo_code")
        .find_one({"code": requesr.promo_code}, {"discount": 1})
    )
    discout_percentage = 0
    if discount:
        discout_percentage = discount["discount"]

    price = price * (100 - discout_percentage) / 100
    requesr.price = price

    requesr.discount = discout_percentage
    mdb_result = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .insert_one(requesr.model_dump())
    )
    requesrt_enrollment_id = str(mdb_result.inserted_id)
    user = await get_database().get_collection("user").find_one({"_id": validate_bson_id(requesr.parent_id)})
    if requesr.package_type == "course":
        course = await get_database().get_collection("course").find_one({"_id": validate_bson_id(requesr.course_id)})
    if requesr.package_type == "plan":
        course = await get_database().get_collection("plan").find_one({"_id": validate_bson_id(requesr.course_id)})
    msg = f"""
    There is a new enrollment request:
    email: {user["email"]}
    phone: {user["phone_number"]}
    course: {course["title"]["en"]}
    price: {course["price"]}
    """
    if requesrt_enrollment_id:
        send_email('Enrollment Request', msg, "s-mahmoud.sheliel@zewailcity.edu.eg")
        return ServiceResponse(data={"request": requesr})
    return ServiceResponse(success=False, msg="couln't add enrollment", status_code=409)


async def get_enrollment_requests(user_id: str) -> ServiceResponse:
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .find(
            {"parent_id": str(user_id)},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "student_id": 1,
                "status": 1,
                "course_id": 1,
                "package_type": 1,
                "price": 1,
                "promo_code": 1,
                "discount": 1,
                "comments": 1,
                "price": 1,
                "created_at": 1,
            },
        )
        .to_list(length=None)
    )
    return ServiceResponse(data={"requests": res})


async def get_all_enrollment_requests(user_id: str) -> ServiceResponse:
    user_type = (
        await get_database()
        .get_collection("user")
        .find_one({"_id": validate_bson_id(user_id)}, {"user_type"})
    )
    if user_type["user_type"] != "Admin":
        return ServiceResponse(success=False, msg="Not Accepted User Type")
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "student_id": 1,
                "parent_id": 1,
                "status": 1,
                "course_id": 1,
                "package_type": 1,
                "promo_code": 1,
                "discount": 1,
                "comments": 1,
                "price": 1,
                "comments": 1,
                "created_at": 1,
            },
        )
        .to_list(length=None)
    )
    return ServiceResponse(data={"requests": res})


async def add_comment(
    enrollment_request_id: str, msg: Comment, userId: str
) -> ServiceResponse:
    bson_id = validate_bson_id(enrollment_request_id)
    if not bson_id:
        return ServiceResponse(success=False, msg="enrollment_request_id not Accepted")

    user_type = (
        await get_database()
        .get_collection("user")
        .find_one({"_id": validate_bson_id(str(userId))}, {"user_type": 1})
    )
    msg.sender_type = user_type["user_type"]
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .find_one({"_id": bson_id}, {"_id": 0, "last_comment_id": 1})
    )
    msg.id = res["last_comment_id"] + 1
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .update_one(
            {"_id": bson_id},
            {
                "$push": {"comments": msg.model_dump()},
                "$set": {"last_comment_id": msg.id},
            },
        )
    )
    if res.modified_count > 0:
        return ServiceResponse(msg="Comment Added Succesfully")
    return ServiceResponse(success=False, msg="Could not Add Comment")


async def edit_request_status(
    new_status: str, enrollment_request_id: str, user_id: str
) -> ServiceResponse:
    bson_id = validate_bson_id(enrollment_request_id)
    if not bson_id:
        return ServiceResponse(success=False, msg="enrollment_request_id not Accepted")
    user_type = (
        await get_database()
        .get_collection("user")
        .find_one({"_id": validate_bson_id(user_id)}, {"user_type"})
    )
    if user_type["user_type"] != "Admin":
        return ServiceResponse(success=False, msg="Not Accepted User Type")
    if new_status != "Success" and new_status != "Rejected":
        return ServiceResponse(success=False, msg="Status Refused")
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .update_one({"_id": bson_id}, {"$set": {"status": new_status}})
    )
    if res.modified_count > 0:
        return ServiceResponse(msg="Status Edited Succesfully")
    return ServiceResponse(success=False, msg="requesrt_enrollment not Found")
