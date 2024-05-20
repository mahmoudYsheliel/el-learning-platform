from models.assesment import Assesment, Question
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


async def create_assesment(assesment: Assesment) -> ServiceResponse:
    assesment.last_question_number=0
    mdb_result = await get_database().get_collection("assesment").insert_one(assesment.model_dump())
    
    assesment_id = str(mdb_result.inserted_id)
    if assesment_id:
        return ServiceResponse(data={"assesment_id": assesment_id})
    return ServiceResponse(success=False, msg="couln't add assesment", status_code=409)


async def delete_assesment(assesment_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad assesment ID")

    result = (
        await get_database().get_collection("assesment").delete_one({"_id": bson_id})
    )
    if not result.deleted_count:
        return ServiceResponse(
            success=False, status_code=404, msg="assesment not Found"
        )
    return ServiceResponse(mag="OK")


async def update_assesment(assesment_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad assesment ID")

    assesment_model_fields = set(Assesment.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(assesment_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid assesment Update Keys")

    result = (
        await get_database()
        .get_collection("assesment")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=404, msg="assesment not Found"
        )
    return ServiceResponse(msg="OK")


async def get_assesment(assesment_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad assesment ID")

    assesment = (
        await get_database()
        .get_collection("assesment")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "description": 1,
                "order": 1,
                "questions": 1,
            },
        )
    )
    if not assesment:
        return ServiceResponse(
            success=False, status_code=404, msg="assesment Not Found"
        )
    return ServiceResponse(data={"assesment": assesment})


async def add_question(assesment_id: str, question: Question) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")
    last_order = (
        await get_database().get_collection("assesment").find_one({"_id": bson_id})
    )
    if not last_order:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")
    last_order = last_order["last_question_number"]
    question.id = last_order
    last_order = last_order + 1
   

    result = (
        await get_database()
        .get_collection("assesment")
        .update_one({"_id": bson_id}, {"$push": {"questions": question.model_dump()}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be added"
        )
    result = (
        await get_database()
        .get_collection("assesment")
        .update_one({"_id": bson_id}, {"$set": {"last_question_number": last_order}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be added"
        )
    return ServiceResponse(data={"assesment_id": assesment_id})


async def delete_question(assesment_id: str, question_id: int) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")

    result = (
        await get_database()
        .get_collection("assesment")
        .update_one({"_id": bson_id}, {"$pull": {"questions": {"id": question_id}}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be deleted"
        )
    return ServiceResponse(data={"assesment_id": assesment_id})


async def update_question(
    assesment_id: str, question_id: int, new_question: str
) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")

    result = (
        await get_database()
        .get_collection("assesment")
        .update_one({"_id": bson_id}, {"$pull": {"questions": {"id": question_id}}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be updated"
        )

    result = (
        await get_database()
        .get_collection("assesment")
        .update_one(
            {"_id": bson_id},
            {"$push": {"questions": {"id": question_id, "question": new_question}}},
        )
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="question couldn't be updated"
        )

    return ServiceResponse(data={"assesment_id": assesment_id})
