from models.enrollments import (
    Enrollment,
    RequestEnrollment,
    AddProgress,
    Comment
)
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


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

    user_bson = validate_bson_id(enrollment.student_id)
    user = (
        await get_database()
        .get_collection("user")
        .find_one({"_id": user_bson}, {"balance": 1})
    )

    course_bson = validate_bson_id(enrollment.course_id)
    if not course_bson:
        return ServiceResponse(
            success=False, msg="couln't find course", status_code=409
        )

    course = (
        await get_database()
        .get_collection("course")
        .find_one({"_id": course_bson}, {"price": 1, "number_of_enrollments": 1})
    )
    if not course:
        return ServiceResponse(
            success=False, msg="couln't find course", status_code=409
        )

    if course["price"] > user["balance"]:
        pass
    #  return ServiceResponse(success=False,msg="not enough balance",status_code=409 )
    else:
        new_balance = user["balance"] - course["price"]
        result = (
            await get_database()
            .get_collection("user")
            .update_one({"_id": user_bson}, {"$set": {"balance": new_balance}})
        )
        await get_database().get_collection("course").update_one(
            {"_id": course_bson},
            {"$set": {"number_of_enrollments": course["number_of_enrollments"] + 1}},
        )
        if not result.modified_count:
            return ServiceResponse(
                success=False, status_code=404, msg="enrollment not Found"
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
    bson_id = validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad enrollment ID")

    bson_student_id = validate_bson_id(user_id)

    enrollment = (
        await get_database()
        .get_collection("enrollment")
        .find_one(
            {"student_id": str(user_id), "course_id": course_id},
            {"_id": 0, "id": {"$toString": "$_id"}, "progress": 1, "is_completed": 1},
        )
    )
    if not enrollment:
        return ServiceResponse(
            success=False, status_code=404, msg="enrollment Not Found"
        )
    return ServiceResponse(data={"enrollment": enrollment})


async def get_all_enrollments(user_id: str):
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
        .find_one({"_id": bson_enrolment_id}, {"student_id": 1})
    )
    if not result:
        return ServiceResponse(
            success=False, status_code=400, msg="Enrollment Not Found 2"
        )
    if result["student_id"] != str(student_id):
        return ServiceResponse(success=False, status_code=400, msg="Bad User")

    if progres.material_type == "Lesson":
        if not progres.lesson_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Lesson Progress Is Not Accepted"
            )
        course_id = (
            await get_database()
            .get_collection("enrollment")
            .find_one({"_id": bson_enrolment_id}, {"course_id": 1})
        )
        course = (
            await get_database()
            .get_collection("course")
            .find_one(
                {"_id": validate_bson_id(course_id["course_id"])}, {"chapters": 1}
            )
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
                        return ServiceResponse(msg="Lesson Progress Accepted")
        return ServiceResponse(success=False, msg="Lesson  Not Found")

    if progres.material_type == "Quiz":
        if not progres.quiz_progress:
            return ServiceResponse(
                success=False, status_code=400, msg="Quiz Progress Is Not Accepted"
            )
        course_id = (
            await get_database()
            .get_collection("enrollment")
            .find_one({"_id": bson_enrolment_id}, {"course_id": 1})
        )
        course = (
            await get_database()
            .get_collection("course")
            .find_one(
                {"_id": validate_bson_id(course_id["course_id"])}, {"chapters": 1}
            )
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
                        return ServiceResponse(msg="Quiz Progress Accepted")
        return ServiceResponse(success=False, msg="Quiz  Not Found")
    return ServiceResponse(success=False, msg="Type Not Set Priperly")


async def request_enrollment(requesr: RequestEnrollment) -> ServiceResponse:

    mdb_result = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .insert_one(requesr.model_dump())
    )
    requesrt_enrollment_id = str(mdb_result.inserted_id)
    if requesrt_enrollment_id:
        return ServiceResponse(data={"requesrt_enrollment_id": requesrt_enrollment_id})
    return ServiceResponse(success=False, msg="couln't add enrollment", status_code=409)

async def get_enrollment_requests(user_id: str) -> ServiceResponse:
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .find(
            {"parent_id": str(user_id)},
            {
                "_id":0,
                "id": {"$toString": "$_id"},
                "student_id": 1,
                "status": 1,
                "course_id": 1,
                "comments": 1,
                "created_at": 1,
            },
        ).to_list(length=None)
    )
    return  ServiceResponse(data={'requests':res})


async def get_all_enrollment_requests(user_id: str) -> ServiceResponse:
    user_type =  await get_database().get_collection('user').find_one({'_id':validate_bson_id(user_id)},{'user_type'})
    if user_type['user_type'] != 'Admin':
        return  ServiceResponse(success=False,msg='Not Accepted User Type')
    res = (
        await get_database()
        .get_collection("requesrt_enrollment")
        .find(
            {},
            {
                "_id":0,
                "id": {"$toString": "$_id"},
                "student_id": 1,
                "parent_id": 1,
                "status": 1,
                "course_id": 1,
                "comments": 1,
                "created_at": 1,
            },
        ).to_list(length=None)
    )
    return  ServiceResponse(data={'requests':res})

async def add_comment(enrollment_request_id:str,msg:Comment,userId:str) ->ServiceResponse:
    bson_id = validate_bson_id(enrollment_request_id)
    if not bson_id:
        return ServiceResponse(success=False,msg='enrollment_request_id not Accepted')
    
    user_type =await get_database().get_collection('user').find_one({'_id':validate_bson_id(str(userId))},{'user_type':1})
    msg.sender_type=user_type['user_type']
    res = await get_database().get_collection('requesrt_enrollment').find_one({'_id':bson_id},{'_id':0,'last_comment_id':1})
    msg.id = res['last_comment_id']+1
    res = await get_database().get_collection('requesrt_enrollment').update_one({'_id':bson_id},{'$push':{'comments':msg.model_dump()},'$set':{'last_comment_id':msg.id}})
    if res.modified_count>0:
        return ServiceResponse(msg='Comment Added Succesfully')
    return ServiceResponse(success=False,msg='Could not Add Comment')


async def edit_request_status(new_status:str,enrollment_request_id:str,user_id:str)->ServiceResponse:
    bson_id = validate_bson_id(enrollment_request_id)
    if not bson_id:
        return ServiceResponse(success=False,msg='enrollment_request_id not Accepted')
    user_type =  await get_database().get_collection('user').find_one({'_id':validate_bson_id(user_id)},{'user_type'})
    if user_type['user_type'] != 'Admin':
        return  ServiceResponse(success=False,msg='Not Accepted User Type')
    if new_status != 'Success' and new_status != 'Rejected':
        return  ServiceResponse(success=False,msg='Status Refused')
    res = await get_database().get_collection('requesrt_enrollment').update_one({'_id':bson_id},{'$set':{'status':new_status}})
    if res.modified_count>0:
        return ServiceResponse(msg='Status Edited Succesfully')
    return ServiceResponse(success=False,msg='requesrt_enrollment not Found')
    