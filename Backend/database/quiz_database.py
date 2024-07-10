from models.quiz import Quiz, Question,Choice
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


async def create_quiz(quiz: Quiz) -> ServiceResponse:
    mdb_result = await get_database().get_collection("quiz").insert_one(quiz.model_dump())
    
    quiz_id = str(mdb_result.inserted_id)
    if quiz_id:
        return ServiceResponse(data={"quiz_id": quiz_id})
    return ServiceResponse(success=False, msg="couln't add quiz", status_code=409)


async def delete_quiz(quiz_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad quiz ID")

    result = (
        await get_database().get_collection("quiz").delete_one({"_id": bson_id})
    )
    if not result.deleted_count:
        return ServiceResponse(
            success=False, status_code=404, msg="quiz not Found"
        )
    return ServiceResponse(mag="OK")


async def update_quiz(quiz_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad quiz ID")

    quiz_model_fields = set(Quiz.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(quiz_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid quiz Update Keys")

    result = (
        await get_database()
        .get_collection("quiz")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=404, msg="quiz not Found"
        )
    return ServiceResponse(msg="OK")


async def get_quiz(quiz_id: str,userId:str) -> ServiceResponse:
    
    user_type = await get_database().get_collection('user').find_one({'_id':userId})
    if user_type['user_type'] == 'Child':
        bson_id=validate_bson_id(quiz_id)
        if not bson_id:
            return ServiceResponse(status_code=400, msg='Bad Quiz ID')
        course_id = await get_database().get_collection('course').find_one({'chapters.materials.Id':quiz_id},{'_id':1})
        if not course_id:
            return ServiceResponse(status_code=400, msg='This Quiz not Found in any Course')
        enrollmet_id = await get_database().get_collection('enrollment').find_one({'course_id':str(course_id['_id']),'student_id':str(userId)},{'_id':1})
        if not enrollmet_id:
            return ServiceResponse(status_code=400, msg='This Course is not Available for This Student')
        bson_id = validate_bson_id(quiz_id)
        if not bson_id:
            return ServiceResponse(status_code=400, msg="Bad quiz ID")

        quiz = (
            await get_database()
            .get_collection("quiz")
            .find_one(
                {"_id": bson_id},
                {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "title": 1,
                    "description": 1,
                    "order": 1,
                    "questions": 1,
                    'duaration':1
                },
            )
        )
        if not quiz:
            return ServiceResponse(
                success=False, status_code=404, msg="quiz Not Found"
            )
        return ServiceResponse(data={"quiz": quiz})
    return ServiceResponse(
                success=False, status_code=404, msg="User Not Allowed"
            )


async def add_question(quiz_id: str, question: Question) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
    last_order = (
        await get_database().get_collection("quiz").find_one({"_id": bson_id})
    )
    if not last_order:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
    last_order = last_order["last_question_number"]
    last_order = last_order + 1
    question.id = last_order
    for i, choice in enumerate(question.choices):
        choice.id=i
    
    result = (
        await get_database()
        .get_collection("quiz")
        .update_one({"_id": bson_id}, {"$push": {"questions": question.model_dump()}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be added"
        )
    result = (
        await get_database()
        .get_collection("quiz")
        .update_one({"_id": bson_id}, {"$set": {"last_question_number": last_order}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be added"
        )
    return ServiceResponse(data={"quiz_id": quiz_id})


async def delete_question(quiz_id: str, question_id: int) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")

    result = (
        await get_database()
        .get_collection("quiz")
        .update_one({"_id": bson_id}, {"$pull": {"questions": {"id": question_id}}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be deleted"
        )
    return ServiceResponse(data={"quiz_id": quiz_id})


async def update_question(
    quiz_id: str, question_id: int, update: dict
) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
    
    
    question_model_fields = set(Question.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(question_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid question Update Keys")

    result = (
        await get_database()
        .get_collection("quiz")
        .update_one({"_id": bson_id}, {"$pull": {"questions": {"id": question_id}}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be updated"
        )

    result = (
        await get_database()
        .get_collection("quiz")
        .update_one(
            {"_id": bson_id},
            {"$push": {"questions": {"id": question_id, "question": update}}},
        )
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be updated"
        )

    return ServiceResponse(data={"quiz_id": quiz_id})
