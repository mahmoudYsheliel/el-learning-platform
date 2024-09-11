import motor.motor_asyncio
from bson import ObjectId

mdb_client: motor.motor_asyncio.AsyncIOMotorClient | None = None


async def mongodb_connect():
    connection_string = "mongodb://root:oDJSwjBHFnIhU2KHBp7L2xf65VcNK9gWBll82Mpmuii1ly8KUYqFODTHx5xvkAht@localhost:27017/"
    global mdb_client
    mdb_client = motor.motor_asyncio.AsyncIOMotorClient(
        connection_string, serverSelectionTimeoutMS=3000
    )


def get_database() -> motor.motor_asyncio.core.AgnosticDatabase | None:
    if mdb_client:
        return mdb_client.E_Learning
    return None


def validate_bson_id(bson_id: str) -> ObjectId | None:
    try:
        return ObjectId(bson_id)
    except:
        return None


async def check_existance_in_DB(id: str, collection_name: str):
    bson_id = validate_bson_id(id)
    if bson_id:
        result = (
            await get_database()
            .get_collection(collection_name)
            .find_one({"_id": bson_id})
        )
        if result:
            return result
    return False
