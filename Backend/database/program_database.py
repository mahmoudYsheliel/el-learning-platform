from models.program import RoadMapCourse, Program
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


async def create_program(program: Program) -> ServiceResponse:
    mdb_result = (
        await get_database().get_collection("program").insert_one(program.model_dump())
    )
    program_id = str(mdb_result.inserted_id)
    if program_id:
        return ServiceResponse(data={"program_id": program_id})
    return ServiceResponse(success=False, msg="couln't add program", status_code=409)


async def delete_program(program_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(program_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad program ID")

    result = await get_database().get_collection("program").delete_one({"_id": bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg="program not Found")
    return ServiceResponse(mag="OK")


async def update_program(program_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(program_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad program ID")

    program_model_fields = set(Program.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(program_model_fields):
        return ServiceResponse(status_code=400, msg="Invalid program Update Keys")

    result = (
        await get_database()
        .get_collection("program")
        .update_one({"_id": bson_id}, {"$set": update})
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg="program not Found")
    return ServiceResponse(msg="OK")


async def get_program(program_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(program_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad program ID")

    program = (
        await get_database()
        .get_collection("program")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "description": 1,
                "min_age":1,
                "max_age":1,
                "road_map": 1,
                "image": 1,
                "tracks":1
            },
        )
    )

    if not program:
        return ServiceResponse(success=False, status_code=404, msg="program Not Found")
    return ServiceResponse(data={"program": program})


async def get_all_programs() -> ServiceResponse:
    program = (
        await get_database()
        .get_collection("program")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "image": 1,
                "description": 1,
                "min_age":1,
                "max_age":1
            },
        )
        .to_list(length=None)
    )
    if not program:
        return ServiceResponse(success=False, status_code=404, msg="program Not Found")
    return ServiceResponse(data={"program": program})


async def get_all_programs_and_courses() -> ServiceResponse:
    programs = (
        await get_database()
        .get_collection("program")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "image": 1,
                "description": 1,
                "road_map": 1,
                "min_age":1,
                "max_age":1,
                "image": 1,
                "tracks":1
            },
        )
        .to_list(length=None)
    )
    new_programs={}
    new_programs['programs']=[]
    if programs:
        for program in programs:
            new_program={}
            new_program={**program}
            new_program['courses']=[]
            courses = []
            for course_id in program["road_map"]:
                course = (
                    await get_database()
                    .get_collection("course")
                    .find_one(
                        {"_id": validate_bson_id(course_id["id"])},
                        {'_id':0,"id": {"$toString": "$_id"},"image": 1, "title": 1,"is_locked":1},
                    )
                )
                courses.append(course)
                
            new_program['courses']=courses
            new_programs['programs'].append(new_program)
    if not programs:
        return ServiceResponse(success=False, status_code=404, msg="program Not Found")
    return ServiceResponse(data=new_programs)
