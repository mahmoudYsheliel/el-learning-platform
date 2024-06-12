from models.student_quiz_answers import StudentQuizAnswers,Answer
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id
from datetime import datetime


async def add_answer(student_id: str,quiz_id:str,answers:list[Answer]) -> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
    result = await get_database().get_collection('quiz').find_one({'_id':bson_id})
    if not result:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
    
    for ans in answers:
        if not any(q['id'] == ans.model_dump()['question_id'] for q in result['questions']):
            return ServiceResponse(success=False,status_code=400, msg="wrong question id")
        for q in result['questions']:
            if   any( c['id'] == ans.model_dump()['choice_id']    for c in q['choices']):
                break
            return ServiceResponse(success=False,status_code=400, msg="wrong choice id")
    
        
        
    mdb_result = await get_database().get_collection('student_quiz_answers').insert_one({'student_id':student_id,'quiz_id':quiz_id,'created_at':datetime.now().isoformat()})
    student_quiz_answers_id =str(mdb_result.inserted_id)
    bson_id = validate_bson_id(student_quiz_answers_id)
    if not student_quiz_answers_id:
        return ServiceResponse(success=False,msg="couln't add quiz_answer",status_code=409 )
  
    for ans in answers:
        result = await get_database().get_collection('student_quiz_answers').update_one({'_id':bson_id},{'$push':{'answers': ans.model_dump()}})
        if not result.modified_count:
            return ServiceResponse(success=False,status_code=400, msg="student_quiz_answers couldn't be added")
    return ServiceResponse(data={'student_quiz_answers': student_quiz_answers_id})



async def get_student_quiz_answers(quiz_id:str,student_id:str)-> ServiceResponse:
    bson_id = validate_bson_id(quiz_id)
    if not bson_id:
        return ServiceResponse(success=False, status_code=400, msg="Bad quiz ID")
 
    student_quiz_answers = await get_database().get_collection('student_quiz_answers').find({"quiz_id": quiz_id,'student_id':student_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'answers':1,
    }).to_list(length=None)
    if not student_quiz_answers:
        return ServiceResponse(success=False,status_code=404, msg='student_quiz_answers Not Found')
    return ServiceResponse(data={'student_quiz_answers': student_quiz_answers})


