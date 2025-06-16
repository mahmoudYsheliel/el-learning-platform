from models.activity import Activity
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
from datetime import datetime

async def create_activity(activity: Activity) -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("activity")
        .insert_one(activity.model_dump())
    )
    activity_id = str(mdb_result.inserted_id)
    if activity_id:
        return ServiceResponse(data={"activity_id": activity_id})
    return ServiceResponse(success=False, msg="couln't add activity", status_code=409)


async def delete_activity(losson_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad activity ID")

    result = (
        await get_database().get_collection("activity").delete_one({"_id": bson_id})
    )
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg="activity not Found")
    return ServiceResponse(mag="OK")


async def update_activity(activity_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(activity_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad activity ID")

    activity_model_fields = set(Activity.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(activity_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid activity Update Keys")

    result = (
        await get_database()
        .get_collection("activity")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg="activity not Found")
    return ServiceResponse(msg="OK")


async def get_activity(activity_id: str, userId: str) -> ServiceResponse:
    bson_id = validate_bson_id(activity_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad activity ID")
    user_type = await get_database().get_collection("user").find_one({"_id": userId})
    if user_type["user_type"] == "Admin":
        activity = (
            await get_database()
            .get_collection("activity")
            .find_one(
                {"_id": bson_id},
                {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "title": 1,
                    "description": 1,
                    "content": 1,
                    "start_images": 1,
                    "end_images": 1,
                    "sources": 1,
                    "objectives": 1,
                    "terms_concepts": 1,
                    "materials": 1,
                    "instructions": 1,
                    "results": 1,
                    "conclusions": 1,
                },
            )
        )
        if not activity:
            return ServiceResponse(
                success=False, status_code=404, msg="activity Not Found"
            )
        return ServiceResponse(data={"activity": activity})
        
    if user_type["user_type"] == "Child":
        
        course_id = (
            await get_database()
            .get_collection("course")
            .find_one({"chapters.materials.Id": activity_id}, {"_id": 1})
        )
        if not course_id:
            return ServiceResponse(
                status_code=400, msg="This activity not Found in any Course"
            )
        enrollment = await get_database().get_collection('enrollment').find_one({'course_id':str(course_id['_id']),'student_id':str(userId)},{'_id':1,'end_date':1})
        if not (enrollment and (not enrollment['end_date'] or datetime.strptime(enrollment['end_date'], "%Y-%m-%d") >= datetime.now().utcnow())):
            return ServiceResponse(status_code=400, msg='This Course is not Available for This Student')

        activity = (
            await get_database()
            .get_collection("activity")
            .find_one(
                {"_id": bson_id},
                {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "title": 1,
                    "description": 1,
                    "content": 1,
                    "start_images": 1,
                    "end_images": 1,
                    "sources": 1,
                    "objectives": 1,
                    "terms_concepts": 1,
                    "materials": 1,
                    "instructions": 1,
                    "results": 1,
                    "conclusions": 1,
                },
            )
        )
        if not activity:
            return ServiceResponse(
                success=False, status_code=404, msg="activity Not Found"
            )
        return ServiceResponse(data={"activity": activity})
    return ServiceResponse(success=False, status_code=404, msg="User Not Allowed")
