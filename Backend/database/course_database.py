from models.course import Course
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id, check_existance_in_DB
from lib.materials import materials


async def create_course(course: Course) -> ServiceResponse:
    course.number_of_enrollments = 0
    for chapter in course.chapters:
        for mat in chapter.materials:
            for material in materials:
                if material["type"] == mat.type:
                    result =await check_existance_in_DB(
                        mat.Id, collection_name=material["DB_name"]
                    )
                    if not result:
                        return ServiceResponse(
                            success=False, msg="bad id for" + material["DB_name"] + mat.Id
                        )

    for category in course.categories:
        result =await check_existance_in_DB(category.Id, collection_name="category")
        if not result:
            return ServiceResponse(success=False, msg="bad id for category")

    mdb_result = (
        await get_database().get_collection("course").insert_one(course.model_dump())
    )
    course_id = str(mdb_result.inserted_id)
    if course_id:
        return ServiceResponse(data={"course_id": course_id})
    return ServiceResponse(success=False, msg="couln't add course", status_code=409)


async def delete_course(course_id: str) -> ServiceResponse:
    result =await check_existance_in_DB(course_id, "course")
    if not result:
        return ServiceResponse(success=False, msg="bad course id")
    if result["chapters"]:
        for chapter in result["chapters"]:
            if chapter["materials"]:
                for mat in chapter["materials"]:
                    bson_id = validate_bson_id(mat["Id"])
                    if not bson_id:
                        return ServiceResponse(
                            success=False, msg="bad material id" + mat["type"]
                        )
                    for material in materials:
                        if mat["type"] == material["type"]:
                            result = (
                                await get_database()
                                .get_collection(material["DB_name"])
                                .delete_one({"_id": bson_id})
                            )
                            if not result:
                                return ServiceResponse(
                                    success=False, msg="bad id for " + material["type"]
                                )

    result = await get_database().get_collection("course").delete_one({"_id": validate_bson_id(course_id)})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg="course not Found")
    return ServiceResponse(mag="OK")


async def update_course(course_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad course ID")

    course_model_fields = set(Course.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(course_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid course Update Keys")

    result = (
        await get_database()
        .get_collection("course")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg="course not Found")
    return ServiceResponse(msg="OK")


async def get_course(course_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad course ID")

    course = (
        await get_database()
        .get_collection("course")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "description": 1,
                "price": 1,
                "image": 1,
                "duration": 1,
                "min_age": 1,
                "max_age": 1,
                "objectives": 1,
                "chapters": 1,
                "categories": 1,
                "is_locked":1
            },
        )
    )
    if not course:
        return ServiceResponse(success=False, status_code=404, msg="course Not Found")
    return ServiceResponse(data={"course": course})


async def get_all_courses():
    courses = (
        await get_database()
        .get_collection("course")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "image": 1,
                "duration": 1,
                "category": 1,
                "min_age": 1,
                "max_age": 1,
                "categories": 1,
                "is_locked":1
            },
        )
        .to_list(length=None)
    )

    if not courses:
        return ServiceResponse(success=False, status_code=404, msg="courses Not Found")
    return ServiceResponse(data={"courses": courses})


async def get_all_instructor_courses(main_instructor_id):
    courses = (
        await get_database()
        .get_collection("course")
        .find(
            {"main_instructor": main_instructor_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "image": 1,
                "duration": 1,
                "category": 1,
                "min_age": 1,
                "max_age": 1,
                "categories": 1,
                "is_locked":1
            },
        )
        .to_list(length=None)
    )

    if not courses:
        return ServiceResponse(data={"courses": courses})
    return ServiceResponse(data={"courses": courses})


async def get_all_courses_with_free_lessons():
    courses = (
        await get_database()
        .get_collection("course")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "image": 1,
                "categories": 1,
                "chapters": 1,
                "is_locked":1
            },
        )
        .to_list(length=None)
    )

    if not courses:
        return ServiceResponse(success=False, status_code=404, msg="courses Not Found")
    courses_sent =[]
    for course in courses:
        if "is_locked" in course:
            if course["chapters"] and  not course["is_locked"]:
                lesson = course["chapters"][0]["materials"][0]
                course["lesson"] = lesson
                course["chapters"] = []
                courses_sent.append(course)
        else:
            if course["chapters"]:
                lesson = course["chapters"][0]["materials"][0]
                course["lesson"] = lesson
                course["chapters"] = []
                courses_sent.append(course)
    return ServiceResponse(data={"courses": courses_sent})


async def get_course_free_lessons(course_id: str):
    course = (
        await get_database()
        .get_collection("course")
        .find_one(
            {"_id": validate_bson_id(course_id)},
            {"_id": 0, "id": {"$toString": "$_id"}, "title": 1, "chapters": 1},
        )
    )

    if not course:
        return ServiceResponse(success=False, status_code=404, msg="courses Not Found")

    lesson_id = course["chapters"][0]["materials"][0]["Id"]
    lesson = (
        await get_database()
        .get_collection("lesson")
        .find_one(
            {"_id": validate_bson_id(lesson_id)},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "source": 1,
                "description": 1,
            },
        )
    )
    course["chapters"] = []
    return ServiceResponse(data={"course": course, "lesson": lesson})
