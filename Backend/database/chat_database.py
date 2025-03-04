from models.chat import Chat, Message
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


async def create_chat(chat: Chat, userId: str) -> ServiceResponse:
    chat.student_id=str(userId)
    mdb_result = (
        await get_database()
        .get_collection("chat")
        .find_one(
            {"student_id": str(userId), "course_id": chat.course_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
            },
        )
    )
    if mdb_result:
        return ServiceResponse(data={"chat_id": mdb_result["id"]})


    instructors = (
        await get_database()
        .get_collection("instructor")
        .find(
            {"courses": {"$elemMatch": {"$eq": chat.course_id}}},
            {
                "_id": 0,
                "user_id": 1,
            },
        )
        .to_list(length=None)
    )
    for instructor in instructors:
        email = (
            await get_database()
            .get_collection("user")
            .find_one(
                {"_id": validate_bson_id(instructor["user_id"])}, {"_id": 0, "email": 1}
            )
        )
        chat.participants.append(
            {"id": instructor["user_id"], "username": email["email"]}
        )
    mdb_result = (
        await get_database().get_collection("chat").insert_one(chat.model_dump())
    )
    chat_id = str(mdb_result.inserted_id)
    if chat_id:
        return ServiceResponse(data={"chat_id": chat_id})
    return ServiceResponse(success=False, msg="couln't add chat", status_code=409)


async def send_message(chat_id: str, message: Message):
    bson_id = validate_bson_id(chat_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad chat ID")

    result = (
        await get_database()
        .get_collection("chat")
        .update_one({"_id": bson_id}, {"$push": {"messages": message.model_dump()}})
    )
    if not result.modified_count:
        return ServiceResponse(
            success=False, status_code=400, msg="message couldn't be added"
        )
    return ServiceResponse(data={"chat_id": chat_id})


async def get_chat(chat_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(chat_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad chat ID")

    chat = (
        await get_database()
        .get_collection("chat")
        .find_one(
            {"_id": bson_id},
            {
               "_id": 0,
                "id": {"$toString": "$_id"},
                "participants": 1,
                "student_name":1,
                "course_title":1,
                "messages": 1,
                "chat_name": 1,
                "avatar": 1,
            },
        )
    )
    if not chat:
        return ServiceResponse(success=False, status_code=404, msg="chat Not Found")
    return ServiceResponse(data={"chat": chat})



async def get_chats(user_id:str) -> ServiceResponse:
    chats = (
        await get_database()
        .get_collection("chat")
        .find(
            {"participants":  {"$elemMatch": {"id":str(user_id) }}},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "participants": 1,
                "student_name":1,
                "course_title":1,
                "messages": 1,
                "chat_name": 1,
                "avatar": 1,
            },
        ).to_list(length=None)
    )
    if not chats:
        return ServiceResponse(success=False, status_code=404, msg="chat Not Found")
    return ServiceResponse(data={"chat": chats})
