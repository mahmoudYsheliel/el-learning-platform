from models.plan import Plan
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id




async def create_plan(plan: Plan):
    for course_id in plan.courses:
        course_bson_id = validate_bson_id(course_id.Id)
        if not course_bson_id:
            return ServiceResponse(
                success=False, status_code=404, msg="One Course Not Found"
            )
        course = (
            await get_database()
            .get_collection("course")
            .find_one({"_id": course_bson_id})
        )
        if not course:
            return ServiceResponse(
                success=False, status_code=404, msg="One Course Not Found"
            )

    result = (
        await get_database()
        .get_collection("plan")
        .insert_one(plan.model_dump())
    )
    plan_id = str(result.inserted_id)
    if plan_id:
        return ServiceResponse(data={"plan_id": plan_id})
    return ServiceResponse(success=False, msg="couln't add plan", status_code=409)



async def get_plan(plan_id: str):
    plan_bson = validate_bson_id(plan_id)
    if not plan_bson:
        return ServiceResponse(success=False, status_code=404, msg="Plan Not Found1")
    plan = (
        await get_database()
        .get_collection("plan")
        .find_one(
            {"_id": plan_bson},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "name": 1,
                "title": 1,
                "description": 1,
                "courses":1,
                "image":1,
                "price":1,
                "objectives":1,
                "categories":1,
                "min_age":1,
                "max_age":1
            },
        )
    )
    if not plan:
        return ServiceResponse(success=False, status_code=404, msg="Plan Not Found2")
    return ServiceResponse(data={"plan": plan})


async def get_all_plans():
    plan = (
        await get_database()
        .get_collection("plan")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "name": 1,
                "title": 1,
                "description": 1,
                "courses":1,
                "image":1,
                "price":1
            },
        )
        .to_list(length=None)
    )
    if not plan:
        return ServiceResponse(success=False, status_code=404, msg="Plan Not Found")
    return ServiceResponse(data={"plans": plan})


async def get_course_plan(course_id: str):

    plan = (
        await get_database()
        .get_collection("plan")
        .find_one(
            {"courses.Id": course_id},
            {
                "_id": 0,
                "id": {
                    "$toString": "$_id",
                },
                "name": 1,
                "title": 1,
                "description": 1,
                "courses": 1,
                "image":1,
                "price":1
            },
        )
    )
    if not plan:
        return ServiceResponse(success=False, status_code=404, msg="Plan Not Found")
    return ServiceResponse(data={"plan": plan})

async def delete_plan(losson_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad plan ID')

    result = await get_database().get_collection('plan').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='plan not Found')
    return ServiceResponse(mag='OK')




async def update_plan(plan_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(plan_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad plan ID')

    plan_model_fields = set(Plan.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(plan_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid plan Update Keys')

    result = await get_database().get_collection('plan').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='plan not Found')
    return ServiceResponse(msg='OK')