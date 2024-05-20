from models.chat import Chat,Message
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id



async def create_chat(chat: Chat) -> ServiceResponse:
    mdb_result = await get_database().get_collection('chat').insert_one(chat.model_dump())
    chat_id =str(mdb_result.inserted_id)
    if chat_id:
        return ServiceResponse(data={'chat_id': chat_id})
    return ServiceResponse(success=False,msg="couln't add chat",status_code=409 )


async def send_message(chat_id:str,message:Message):
    bson_id=validate_bson_id(chat_id)
    if not bson_id:
        return ServiceResponse(success=False,status_code=400, msg='Bad chat ID')
    sender=message.sender
    participants=await get_database().get_collection('chat').find_one({ '_id':bson_id },{'participants':1})
    if not participants:
        return ServiceResponse(success=False,status_code=400, msg="bad chat id")
    if sender not in participants['participants']:
        return ServiceResponse(success=False,status_code=401, msg="unauthorized sender")
    result = await get_database().get_collection('chat').update_one({'_id':bson_id},{'$push':{'messages': message.model_dump()}})
    if not result.modified_count:
        return ServiceResponse(success=False,status_code=400, msg="message couldn't be added")
    return ServiceResponse(data={'chat_id': chat_id})
    

async def get_chat(chat_id:str)-> ServiceResponse:
    bson_id=validate_bson_id(chat_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad chat ID')

    chat = await get_database().get_collection('chat').find_one({'_id':bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'participants':1,
        'messages':1,
        
    })
    if not chat:
        return ServiceResponse(success=False,status_code=404, msg='chat Not Found')
    return ServiceResponse(data={'chat': chat})


