from models.user import User, Instructor, Child, Parent, Admin, Notification
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
from lib.crypto import verify_password, hash_password
from datetime import datetime


async def create_user(user: User) -> ServiceResponse:
    user_type = user.user_type
    if (
        user_type != "Instructor"
        and user_type != "Child"
        and user_type != "Parent"
        and user_type != "Admin"
    ):
        return ServiceResponse(
            success=False, status_code=400, msg="user type is not valid"
        )
    found_user = (
        await get_database().get_collection("user").find_one({"email": user.email})
    )
    if found_user:
        return ServiceResponse(
            success=False, status_code=409, msg="email is already used once"
        )

    user.hashed_pass = hash_password(user.hashed_pass)
    mdb_result = (
        await get_database().get_collection("user").insert_one(user.model_dump())
    )
    user_id = str(mdb_result.inserted_id)

    if user_type == "Admin":
        admin = Admin(user_id=user_id)
        mdb_result = (
            await get_database().get_collection("admin").insert_one(admin.model_dump())
        )
        return ServiceResponse(data={"user_id": user_id})

    if user_type == "Instructor":
        instructor = Instructor(user_id=user_id)
        mdb_result = (
            await get_database()
            .get_collection("instructor")
            .insert_one(instructor.model_dump())
        )
        return ServiceResponse(data={"user_id": user_id})
    if user_type == "Child":
        child = Child(user_id=user_id)
        mdb_result = (
            await get_database().get_collection("child").insert_one(child.model_dump())
        )
        return ServiceResponse(data={"user_id": user_id})
    if user_type == "Parent":
        parent = Parent(user_id=user_id)
        mdb_result = (
            await get_database()
            .get_collection("parent")
            .insert_one(parent.model_dump())
        )
        return ServiceResponse(data={"user_id": user_id})
    return ServiceResponse(success=False, status_code=400, msg="failed to add user")


async def validate_user(username: str, password: str) -> ServiceResponse:
    # check user in database
    user = await get_database().get_collection("user").find_one({"email": username})

    if not user:
        return False

    # check password hash
    user = User.model_validate(user)

    if not verify_password(password, user.hashed_pass):
        return False
    return True


async def personal_info(user_id: str):
    bson_id = validate_bson_id(user_id)
    if not bson_id:
        return ServiceResponse(success=False, msg="Couldn't Find User", status_code=409)

    db = get_database()

    # Fetch general user information
    info1 = await db.get_collection("user").find_one(
        {"_id": bson_id},
        {
            "_id": 0,
            'id': {'$toString': '$_id'},
            "email": 1,
            "username": 1,
            "user_type": 1,
            "created_at": 1,
            "phone_number": 1,
            "first_name": 1,
            "last_name": 1,
            "birth_day": 1,
            "gender": 1,
            "balance": 1,
            "image": 1,
            "notifications": 1,
        },
    )

    if not info1:
        return ServiceResponse(success=False, status_code=400, msg="Couldn't Find User")

    info2 = {}

    # Fetch specific user type information
    if info1["user_type"] == "Admin":
        info2 = await db.get_collection("admin").find_one(
            {"user_id": str(user_id)},  # user_id is stored as string
            {
                "_id": 0,
            },
        )

    if info1["user_type"] == "Instructor":
        info2 = await db.get_collection("instructor").find_one(
            {"user_id": str(user_id)},  # user_id is stored as string
            {
                "_id": 0,
                "title": 1,
                "specializations": 1,
                "biography": 1,
                "education_background": 1,
                "experience": 1,
                "philisophy": 1,
                "courses":1
            },
        )
    elif info1["user_type"] == "Parent":
        info2 = await db.get_collection("parent").find_one(
            {"user_id": str(user_id)},
            {
                "_id": 0,
                "location": 1,
                "job": 1,
                "children": 1,
            },
        )
    elif info1["user_type"] == "Child":
        info2 = await db.get_collection("child").find_one(
            {"user_id": str(user_id)},
            {
                "_id": 0,
                "grade": 1,
                "child_group": 1,
                "education_system": 1,
            },
        )
    if info2 is None:
        info2 = {}

    return ServiceResponse(data={"info": {**info1, **info2}})


async def update_user_info(
    userId: str, update: dict, user_type_specific_info: dict
) -> ServiceResponse:
    bson_id = validate_bson_id(userId)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad user ID")

    User_model_fields = set(User.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(User_model_fields):
        return ServiceResponse(
            success=False, status_code=400, msg="Invalid user Update Keys"
        )

    user_type = (
        await get_database()
        .get_collection("user")
        .find_one({"_id": bson_id}, {"user_type": 1})
    )
    updated = None
    if user_type["user_type"] == "Parent":
        User_model_fields = set(Parent.model_fields.keys())
        update_patch_fields = set(user_type_specific_info.keys())
        if not update_patch_fields.issubset(User_model_fields):
            return ServiceResponse(
                success=False, status_code=400, msg="Invalid Parent Update Keys"
            )
        updated = (
            await get_database()
            .get_collection("parent")
            .update_one({"user_id": str(userId)}, {"$set": user_type_specific_info})
        )

    if user_type["user_type"] == "Child":
        User_model_fields = set(Child.model_fields.keys())
        update_patch_fields = set(user_type_specific_info.keys())
        if not update_patch_fields.issubset(User_model_fields):
            return ServiceResponse(
                success=False, status_code=400, msg="Invalid Child Update Keys"
            )
        updated = (
            await get_database()
            .get_collection("child")
            .update_one({"user_id": str(userId)}, {"$set": user_type_specific_info})
        )

    if user_type["user_type"] == "Instructor":
        User_model_fields = set(Instructor.model_fields.keys())
        update_patch_fields = set(user_type_specific_info.keys())
        if not update_patch_fields.issubset(User_model_fields):
            return ServiceResponse(
                success=False, status_code=400, msg="Invalid Instructor Update Keys"
            )
        updated = (
            await get_database()
            .get_collection("instructor")
            .update_one({"user_id": str(userId)}, {"$set": user_type_specific_info})
        )

    result = (
        await get_database()
        .get_collection("user")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count and not updated.modified_count:
        return ServiceResponse(success=False, status_code=404, msg="user not Found")
    return ServiceResponse(msg="Edited Successfully")


async def add_child(user: User, child: Child, userId: str) -> ServiceResponse:

    user.user_type = "Child"
    user.hashed_pass = hash_password(user.hashed_pass)
    birth_date = datetime.now()
    if user.birth_day:
        birth_date = datetime.strptime(user.birth_day, "%Y-%m-%dT%H:%M:%S.%fZ")
    
    today = datetime.now()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    print(age)
    analysis_quiz = (
        await get_database()
        .get_collection("analysis_quiz")
        .find_one(
            {
                "course_title_follow": "start",
                "min_age": {"$lte": age},
                "max_age": {"$gte": age},
            },
            {"id": {"$toString": "$_id"}, "title": 1, "description": 1},
        )
    )
    if analysis_quiz:
        user.notifications.append(
            Notification(
                title=analysis_quiz["title"],
                description=analysis_quiz["description"],
                type="analysis quiz",
                status="waiting",
                analysis_quiz_id=analysis_quiz["id"],
            )
        )
    found_user = (
        await get_database().get_collection("user").find_one({"email": user.email})
    )
    if found_user:
        return ServiceResponse(
            success=False, status_code=409, msg="email is already used once"
        )
    mdb_result = (
        await get_database().get_collection("user").insert_one(user.model_dump())
    )
    add_user_id = str(mdb_result.inserted_id)

    child.user_id = add_user_id
    mdb_result = (
        await get_database().get_collection("child").insert_one(child.model_dump())
    )
    child_id = str(mdb_result.inserted_id)

    if child_id:
        update = (
            await get_database()
            .get_collection("parent")
            .update_one({"user_id": str(userId)}, {"$push": {"children": add_user_id}})
        )
        return ServiceResponse(data={"child_user_id": add_user_id})
    return ServiceResponse(msg="could not add child", success=False)


async def get_all_users(userId:str) -> ServiceResponse:
    user_type=await get_database().get_collection('admin').find_one({'user_id':str(userId)})
    if not user_type:
        return ServiceResponse(success=False,msg="user not allowed")
    users = (
        await get_database()
        .get_collection("user")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "email": 1,
                "user_type": 1,
                "phone_number": 1,
                "first_name": 1,
                "last_name": 1,
                "gender": 1,
                'created_at':1
            },
        )
        .to_list(length=None)
    )
    parents = (
        await get_database()
        .get_collection("parent")
        .find(
            {},
            {
                "_id": 0,
                "user_id": 1,
                "location": 1,
                "job": 1,
                "children": 1
            },
        )
        .to_list(length=None)
    )
    children = (
        await get_database()
        .get_collection("child")
        .find(
            {},
            {
                "_id": 0,
                "user_id": 1,
                "user_type": 1,
                "grade": 1,
                "child_group": 1,
                "education_system": 1,
            },
        )
        .to_list(length=None)
    )

    if children and parents and users:
        return ServiceResponse(data={'children':children,'parents':parents,'users':users})
    return ServiceResponse(success=False , msg="couldn't get users")






async def get_instructors(userId:str) -> ServiceResponse:
    user_type=await get_database().get_collection('admin').find_one({'user_id':str(userId)})
    if not user_type:
        return ServiceResponse(success=False,msg="user not allowed")
    
    users = (
        await get_database()
        .get_collection("user")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "email": 1,
                "user_type": 1,
                "phone_number": 1,
                "first_name": 1,
                "last_name": 1,
                "gender": 1,
                'created_at':1
            },
        )
        .to_list(length=None)
    )
    
    instructors = (
        await get_database()
        .get_collection("instructor")
        .find(
            {},
            {
                "_id": 0,
                "user_id": 1,
                "title": 1,
                "specializations": 1,
                "education_background": 1,
                "biography": 1,
                "experience": 1,
                "philisophy": 1,
                "courses": 1
            },
        )
        .to_list(length=None)
    )

    if instructors and users:
        return ServiceResponse(data={'instructors':instructors,'users':users})
    return ServiceResponse(success=False , msg="couldn't get users")


