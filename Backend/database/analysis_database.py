from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
from models.alaysis import (
    Choice,
    Question,
    AnalysisCriteria,
    Section,
    AnalysisQuiz,
    Answer,
    QuizAnalysis,
    Analysis,
    FeaturePercentage,
    FeaturesPercentages
)


async def create_analysis_quiz(analysis_quiz: AnalysisQuiz) -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("analysis_quiz")
        .insert_one(analysis_quiz.model_dump())
    )
    quiz_id = str(mdb_result.inserted_id)
    if quiz_id:
        return ServiceResponse(data={"quiz_id": quiz_id})
    return ServiceResponse(success=False, msg="couln't add quiz", status_code=409)

async def get_analysis_quiz(analysis_quiz_id:str,userId:str)-> ServiceResponse:
    bson_id=validate_bson_id(analysis_quiz_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad analysis_quiz ID')
    
    quiz_status = await get_database().get_collection('user').find_one({'_id':validate_bson_id(str(userId)),'notifications':{'$elemMatch':{'analysis_quiz_id':analysis_quiz_id}}},{'notifications.$':1})
    
    if quiz_status and quiz_status['notifications'][0]['status']=='done' :
        return ServiceResponse(status_code=400, msg='Quiz Taken Before')
    analysis_quiz = await get_database().get_collection('analysis_quiz').find_one({'_id':bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'title':1,
        'description':1,
        'sections':1,
        'duration':1,
        
    })
    if not analysis_quiz:
        return ServiceResponse(success=False,status_code=404, msg='analysis_quiz Not Found')
    return ServiceResponse(data={'analysis_quiz': analysis_quiz})


async def get_analysis_quiz_title(analysis_quiz_id:str,userId:str)-> ServiceResponse:
    bson_id=validate_bson_id(analysis_quiz_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad analysis_quiz ID')
    analysis_quiz = await get_database().get_collection('analysis_quiz').find_one({'_id':bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'title':1,
        'description':1,
        
    })
    if not analysis_quiz:
        return ServiceResponse(success=False,status_code=404, msg='analysis_quiz Not Found')
    return ServiceResponse(data={'analysis_quiz': analysis_quiz})



async def create_analysis(analysis: Analysis) -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("analysis")
        .insert_one(analysis.model_dump())
    )
    analysis_id = str(mdb_result.inserted_id)
    if analysis_id:
        return ServiceResponse(data={"analysis_id": analysis_id})
    return ServiceResponse(success=False, msg="couln't add analysis", status_code=409)

async def get_analysis(student_id:str)-> ServiceResponse:
    bson_id=validate_bson_id(student_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad student_id ID')

    analysis = await get_database().get_collection('analysis').find_one({'student_id':student_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'future_steps':1,
        'personality':1,
        'skills':1,
        'quizes_answered':1,
        
    })
    if not analysis:
        return ServiceResponse(success=False,status_code=404, msg='analysis Not Found')
    return ServiceResponse(data={'analysis_quiz': analysis})



async def add_analysis_quiz_answer(
    analysis_quiz_id: str, student_id: str, answers: list[Answer]
) -> ServiceResponse:
    analysis = (
        await get_database()
        .get_collection("analysis")
        .find_one(
            {"student_id": str(student_id)},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "future_steps": 1,
                "personality": 1,
                "skills": 1,
                "quizes_answered": 1,
            },
        )
    )
    if not analysis:
        analysis=Analysis(student_id=str(student_id),future_steps=FeaturesPercentages(),skills=FeaturesPercentages(),personality=FeaturesPercentages())
        mdb_result = (
        await get_database()
        .get_collection("analysis")
        .insert_one(analysis.model_dump())
    )
        analysis_id = str(mdb_result.inserted_id)
        analysis = (
        await get_database()
        .get_collection("analysis")
        .find_one(
            {"student_id": str(student_id)},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "future_steps": 1,
                "personality": 1,
                "skills": 1,
                "quizes_answered": 1,
            },
        )
    )
        if not analysis_id:
            return ServiceResponse(success=False, msg="couln't add analysis", status_code=409)
        

    analysis_quiz_bson_id = validate_bson_id(analysis_quiz_id)
    if not analysis_quiz_bson_id:
        return ServiceResponse(success=False, msg="Could not Find Analysis Quiz")
    analysis_quiz = (
        await get_database()
        .get_collection("analysis_quiz")
        .find_one(
            {"_id": analysis_quiz_bson_id},
            {
                "sections": 1,
            },
        )
    )
    analisis_of_the_quiz = analyze_answers(answers, analysis_quiz["sections"])
    quiz_analysis_obj = QuizAnalysis(
        quiz_id=analysis_quiz_id,
        answers=answers,
        future_steps=FeaturesPercentages(feature_percentage_list=analisis_of_the_quiz["future_steps"]),
        personality=FeaturesPercentages(feature_percentage_list=analisis_of_the_quiz["personality"]),
        skills=FeaturesPercentages(feature_percentage_list=analisis_of_the_quiz["skills"]),
    )
    new_future_steps=update_analysis(new_analysis=quiz_analysis_obj.future_steps.feature_percentage_list,old_analysis=analysis['future_steps']['feature_percentage_list'])
    new_personality=update_analysis(new_analysis=quiz_analysis_obj.personality.feature_percentage_list,old_analysis=analysis['personality']['feature_percentage_list'])
    new_skills=update_analysis(new_analysis=quiz_analysis_obj.skills.feature_percentage_list,old_analysis=analysis['skills']['feature_percentage_list'])
    
    result = await get_database().get_collection('analysis').update_one({"student_id": str(student_id)},{'$set':{'future_steps':new_future_steps.model_dump(),'personality':new_personality.model_dump(),'skills':new_skills.model_dump()},'$push':{'quizes_answered':quiz_analysis_obj.model_dump()}})
    if result.modified_count>0:
        result = await get_database().get_collection('user').update_one({'notifications.analysis_quiz_id':analysis_quiz_id,'_id':validate_bson_id(student_id)},{'$set':{'notifications.$.status':'done'}})
 
        if result.matched_count>0:
            return ServiceResponse(msg='Updated Succesfully')
    return ServiceResponse(msg='Could not Add Answer',success=False)
    
    


def analyze_answers(answers: list[Answer], sections: list[Section]) -> FeaturePercentage:
    section_scores = {section['id']: 0 for section in sections}

    # Calculate scores for each section
    for answer in answers:
        for section in sections:
            if section['id'] == answer.section_id:
                for question in section['questions']:
                    if question['id'] == answer.question_id:
                            if question['correct_answer_id'] == int(answer.choice_id):
                                section_scores[
                                    section['id']
                                ] += 1  # You can change the scoring logic as needed

    results = {"personality": [], "skills": [], "future_steps": []}
 
    # Analyze scores and assign features
    for section in sections:
        score = section_scores[section['id']]
        for criteria in section['criteria']:
            if criteria['min_score'] <= score <= criteria['max_score']:
                print(criteria)
                if criteria['future_steps']:
                    results["future_steps"].extend(criteria['future_steps']['feature_percentage_list'])
                if criteria['skills']:
                    results["skills"].extend(criteria['skills']['feature_percentage_list'])
                if criteria['personality']:
                    results["personality"].extend(criteria['personality']['feature_percentage_list'])
               
                

    return results



def update_analysis(
    old_analysis: list[FeaturePercentage],
    new_analysis: list[FeaturePercentage]
) -> FeaturesPercentages:
    # Create a dictionary for easy lookup
    old_dict = {feature['feature']: feature['percentage'] for feature in old_analysis}
    new_dict = {feature.feature: feature.percentage for feature in new_analysis}

    # Combine the results
    combined_dict = {}

    # Add new features or update existing ones with the weighted average
    for feature, new_percentage in new_dict.items():
        if feature in old_dict:
            combined_percentage = int(0.8 * new_percentage + 0.2 * old_dict[feature])
        else:
            combined_percentage = new_percentage
        combined_dict[feature] = combined_percentage

    # Add features that are only in the old analysis
    for feature, old_percentage in old_dict.items():
        if feature not in combined_dict:
            combined_dict[feature] = old_percentage

    # Convert the combined dictionary back to a list of FeaturePercentage objects
    combined_analysis = [FeaturePercentage(feature=feature, percentage=percentage)
                         for feature, percentage in combined_dict.items()]

    combined_analysis=FeaturesPercentages(feature_percentage_list= combined_analysis)

    return combined_analysis
