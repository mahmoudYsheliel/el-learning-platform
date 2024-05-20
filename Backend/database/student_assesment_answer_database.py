from models.student_assesment_answers import StudentAssesmentAnswers,Answer
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id
from datetime import datetime


async def add_answer(student_id: str,assesment_id:str,answers:list[Answer]) -> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")
    result = await get_database().get_collection('assesment').find_one({'_id':bson_id})
    if not result:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")
    
    for ans in answers:
        if not any(q['id'] == ans.model_dump()['question_id'] for q in result['questions']):
            return ServiceResponse(success=False,status_code=400, msg="wrong question id")
    
        
        
    mdb_result = await get_database().get_collection('student_assesment_answers').insert_one({'student_id':student_id,'assesment_id':assesment_id,'created_at':datetime.now().isoformat()})
    student_assesment_answers_id =str(mdb_result.inserted_id)
    bson_id = validate_bson_id(student_assesment_answers_id)
    if not student_assesment_answers_id:
        return ServiceResponse(success=False,msg="couln't add assesment_answer",status_code=409 )
  
    for ans in answers:
        result = await get_database().get_collection('student_assesment_answers').update_one({'_id':bson_id},{'$push':{'answers': ans.model_dump()}})
        if not result.modified_count:
            return ServiceResponse(success=False,status_code=400, msg="student_assesment_answers couldn't be added")
    return ServiceResponse(data={'student_assesment_answers': student_assesment_answers_id})



async def get_student_assesment_answers(assesment_id:str,student_id:str)-> ServiceResponse:
    bson_id = validate_bson_id(assesment_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad assesment ID")
 
    student_assesment_answers = await get_database().get_collection('student_assesment_answers').find({"assesment_id": assesment_id,'student_id':student_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'answers':1,
    }).to_list(length=None)
    if not student_assesment_answers:
        return ServiceResponse(success=False,status_code=404, msg='student_assesment_answers Not Found')
    return ServiceResponse(data={'student_assesment_answers': student_assesment_answers})


