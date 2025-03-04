from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
from models.alaysis import (
    FeatureInfo,
    AnalysisQuiz,
    Answers,
    Analysis,
    FeatureInfo,
    LearningStyle,
    TrackRecommendation,
    LearningStyleScore,
    TrackRecommendationScore,
)


async def create_learning_style(learning_style: LearningStyle) -> ServiceResponse:
    mdb_result = (
        await get_database().get_collection("learning_style").insert_one(learning_style.model_dump())
    )
    careers_id = str(mdb_result.inserted_id)
    if careers_id:
        return ServiceResponse(data={"careers_id": careers_id})
    return ServiceResponse(success=False, msg="couln't add careers", status_code=409)


async def get_learning_style(learning_style_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(learning_style_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad learning_style_id ID")

    learning_style = (
        await get_database()
        .get_collection("learning_style")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "name": 1,
                "title": 1,
                "description": 1,
                "image":1,
                "advice": 1,
            },
        )
    )
    if not learning_style:
        return ServiceResponse(success=False, status_code=404, msg="learning_style Not Found")
    return ServiceResponse(data={"learning_style": learning_style})


async def create_track_recommendation(track_recommendation: TrackRecommendation) -> ServiceResponse:
    mdb_result = (
        await get_database().get_collection("track_recommendation").insert_one(track_recommendation.model_dump())
    )
    careers_id = str(mdb_result.inserted_id)
    if careers_id:
        return ServiceResponse(data={"careers_id": careers_id})
    return ServiceResponse(success=False, msg="couln't add careers", status_code=409)


async def get_track_recommendation(track_recommendation_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(track_recommendation_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad track_recommendation_id ID")

    track_recommendation = (
        await get_database()
        .get_collection("track_recommendation")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "name": 1,
                "title": 1,
                "description": 1,
                "key_skills": 1,
                "advice": 1,
            },
        )
    )
    if not track_recommendation:
        return ServiceResponse(success=False, status_code=404, msg="track_recommendation Not Found")
    return ServiceResponse(data={"track_recommendation": track_recommendation})


async def create_feature_info(feature_info: FeatureInfo) -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("feature_info")
        .insert_one(feature_info.model_dump())
    )
    feature_info_id = str(mdb_result.inserted_id)
    if feature_info_id:
        return ServiceResponse(data={"feature_info_id": feature_info_id})
    return ServiceResponse(
        success=False, msg="couln't add feature_info", status_code=409
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


async def get_all_features_info() -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("feature_info")
        .find(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "name": 1,
                "title": 1,
                "description": 1,
            },
        )
        .to_list(length=None)
    )
    if mdb_result:
        return ServiceResponse(data={"features_info": mdb_result})
    return ServiceResponse(success=False, msg="couln't find features_info", status_code=409)


async def get_analysis_quiz(analysis_quiz_id: str, userId: str) -> ServiceResponse:
    bson_id = validate_bson_id(analysis_quiz_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad analysis_quiz ID")

    quiz_status = (
        await get_database()
        .get_collection("user")
        .find_one(
            {
                "_id": validate_bson_id(str(userId)),
                "notifications": {"$elemMatch": {"analysis_quiz_id": analysis_quiz_id}},
            },
            {"notifications.$": 1},
        )
    )

    if quiz_status and quiz_status["notifications"][0]["status"] == "done":
        return ServiceResponse(status_code=400, msg="Quiz Taken Before")
    analysis_quiz = (
        await get_database()
        .get_collection("analysis_quiz")
        .find_one(
            {"_id": bson_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "title": 1,
                "description": 1,
                "sections": 1,
                "duration": 1,
            },
        )
    )
    if not analysis_quiz:
        return ServiceResponse(
            success=False, status_code=404, msg="analysis_quiz Not Found"
        )
    return ServiceResponse(data={"analysis_quiz": analysis_quiz})


async def get_analysis(student_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(student_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg="Bad student_id ID")

    analysis = (
        await get_database()
        .get_collection("analysis")
        .find_one(
            {"student_id": student_id},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "section_results": 1,
                "learning_styles_results":1,
                "tracks_recommendation_results":1,
            },
        )
    )
    if not analysis:
        return ServiceResponse(success=False, status_code=404, msg="analysis Not Found")
    return ServiceResponse(data={"analysis_quiz": analysis})


async def add_analysis_quiz_answer(
    answers: Answers, student_id: str
) -> ServiceResponse:
    analysis_quiz_bson_id = validate_bson_id(answers.quiz_id)
    if not analysis_quiz_bson_id:
        return ServiceResponse(success=False, msg="Could not Find Analysis Quiz")
    analysis_quiz = (
        await get_database()
        .get_collection("analysis_quiz")
        .find_one(
            {"_id": analysis_quiz_bson_id},
            {
                "_id": 0,
                "sections": 1,
            },
        )
    )
    scores = calculate_scores(answers, analysis_quiz)
    print(scores)
    learning_styles = (
        await get_database().get_collection("learning_style").find({}, {"_id": 0, "id": {"$toString": "$_id"}, "name": 1, "sections_dependence": 1}).to_list(length=None)
    )
    learning_style_scores = calculate_learning_style(scores, learning_styles)
    
    learning_style_results = [
        LearningStyleScore(learning_style_id=learning_style_score['id'], score=learning_style_score['score'])
        for learning_style_score in learning_style_scores
    ]


    track_recommendation = (
        await get_database().get_collection("track_recommendation").find({}, {"_id": 0, "id": {"$toString": "$_id"}, "name": 1, "sections_dependence": 1}).to_list(length=None)
    )
    track_recommendation_scores = calculate_learning_style(scores, track_recommendation)
    
    track_recommendation_results = [
        TrackRecommendationScore(tracks_recommendation_id=track_recommendation_score['id'], score=track_recommendation_score['score'])
        for track_recommendation_score in track_recommendation_scores
    ]

    analysis = Analysis(
        student_id=student_id,
        section_results=scores,
        answers=answers,
        learning_styles_results=learning_style_results,
        tracks_recommendation_results=track_recommendation_results
    )

    result = (
        await get_database()
        .get_collection("analysis")
        .insert_one(analysis.model_dump())
    )
    if result:
        result2 = (
            await get_database()
            .get_collection("user")
            .update_one(
                {
                    "_id": validate_bson_id(student_id),
                    "notifications.analysis_quiz_id": answers.quiz_id,
                },
                {"$set": {"notifications.$.status": "done"}},
            )
        )
        if result2:
            return ServiceResponse(msg="Updated Succesfully")
    return ServiceResponse(msg="Could not Add Answer", success=False)


def aplly_gauss(score: int, min: int = 40, max: int = 160) -> float:
    av = (min + max) / 2
    std = max - min
    return av + (score - 0.5) * std


def calculate_scores(answers: Answers, analysis_quiz: dict) -> list[dict]:
    answers_list = answers.answers
    all_sections = []
    for section in analysis_quiz['sections']:
        sections_sub_sections = {"section": section["info_name"], "sub_sections": []}

        sub_sections = []
        for section in analysis_quiz["sections"]:
            if section['info_name'] == section["info_name"]:
                sub_sections = section['sub_sections']

        for sub_section in sub_sections:
            section_score = {"name": sub_section["info_name"], "total_score": 0}
            total = 0
            max_total = 0
            for question in sub_section["questions"]:
                max_choice = 0
                for choice in question["choices"]:
                    max_choice = max(choice['score'], max_choice)
                    score = next(
                        (
                            choice["score"]
                            for answer in answers_list
                            if answer.sub_section_name == sub_section["info_name"]
                            and answer.question_id == question["id"]
                            and choice["id"] == answer.choice_id
                        ),
                        None,
                    )
                    if score:
                        total += score
                max_total += max_choice
                section_score["total_score"] = aplly_gauss(total / max_total)
            sections_sub_sections["sub_sections"].append(section_score)

        all_sections.append(sections_sub_sections)
    return all_sections


def get_subsection_score(data,subsection_name):
    for section in data:
        if section['section'] == 'IQ':  # Check if the section is IQ
            for sub_section in section['sub_sections']:
                if sub_section['name'] == subsection_name:  # Check if the sub-section is Similarities
                    return sub_section['total_score']
    return 0  # Return None if 'Similarities' is not found


def calculate_learning_style(scores: list[dict], learning_styles: dict):
    learning_style_scores = []

    for learning_style in learning_styles:
        learning_style_obj = {'id': learning_style['id'], 'name': learning_style['name'],'score': 0}
        for dependence in learning_style['sections_dependence']:
            learning_style_obj['score']+= get_subsection_score(scores,dependence)
        learning_style_obj['score']/= len(learning_style['sections_dependence'])
        learning_style_scores.append(learning_style_obj)
    
    return learning_style_scores


async def test_scores(scores:dict) ->ServiceResponse:
    track_recommendation = (
        await get_database().get_collection("track_recommendation").find({}, {"_id": 0, "id": {"$toString": "$_id"}, "name": 1, "sections_dependence": 1}).to_list(length=None)
    )
    track_recommendation_scores = calculate_learning_style(scores, track_recommendation)
    
    track_recommendation_results = [
        TrackRecommendationScore(tracks_recommendation_id=track_recommendation_score['name'], score=track_recommendation_score['score'])
        for track_recommendation_score in track_recommendation_scores
    ]
    return ServiceResponse(success=True,data={"tracks":track_recommendation_results}) 

# def calculate_career_alignment(scores: dict, careers: dict) -> list:
#     all_careers_list = careers["careers"]
#     career_fit_percentage = {}

#     for career in all_careers_list:
#         career_fit_percentage[career["name"]] = 0

#     for score_section in scores["iq"]["sections"]:
#         for career in all_careers_list:
#             criteria = next(
#                 (
#                     criteria
#                     for criteria in career["criteria"]
#                     if criteria["name"] == score_section["name"]
#                 ),
#                 None,
#             )
#             if criteria:
#                 score = aplly_gauss(
#                     criteria["min_score"],
#                     criteria["max_score"],
#                     score_section["total_score"],
#                 )
#                 career_fit_percentage[career["name"]] += score * 20

#     for score_section in scores["big5traits"]["sections"]:
#         for career in all_careers_list:
#             criteria = next(
#                 (
#                     criteria
#                     for criteria in career["criteria"]
#                     if criteria["name"] == score_section["name"]
#                 ),
#                 None,
#             )
#             if criteria:
#                 score = aplly_gauss(
#                     criteria["min_score"],
#                     criteria["max_score"],
#                     score_section["total_score"],
#                 )
#                 career_fit_percentage[career["name"]] += score * 10

#     for score_section in scores["enneagram"]["sections"]:
#         for career in all_careers_list:
#             criteria = next(
#                 (
#                     criteria
#                     for criteria in career["criteria"]
#                     if criteria["name"] == score_section["name"]
#                 ),
#                 None,
#             )
#             if criteria:
#                 score = aplly_gauss(
#                     criteria["min_score"],
#                     criteria["max_score"],
#                     score_section["total_score"],
#                 )
#                 career_fit_percentage[career["name"]] += score * 20

#     for score_section in scores["learning_styles"]["sections"]:
#         for career in all_careers_list:
#             criteria = next(
#                 (
#                     criteria
#                     for criteria in career["criteria"]
#                     if criteria["name"] == score_section["name"]
#                 ),
#                 None,
#             )
#             if criteria:
#                 score = aplly_gauss(
#                     criteria["min_score"],
#                     criteria["max_score"],
#                     score_section["total_score"],
#                 )
#                 career_fit_percentage[career["name"]] += score * 5

#     return career_fit_percentage


# def update_analysis(
#     old_analysis: list[FeaturePercentage],
#     new_analysis: list[FeaturePercentage]
# ) -> FeaturesPercentages:
#     # Create a dictionary for easy lookup
#     old_dict = {feature['feature']: feature['percentage'] for feature in old_analysis}
#     new_dict = {feature.feature: feature.percentage for feature in new_analysis}

#     # Combine the results
#     combined_dict = {}

#     # Add new features or update existing ones with the weighted average
#     for feature, new_percentage in new_dict.items():
#         if feature in old_dict:
#             combined_percentage = int(0.8 * new_percentage + 0.2 * old_dict[feature])
#         else:
#             combined_percentage = new_percentage
#         combined_dict[feature] = combined_percentage

#     # Add features that are only in the old analysis
#     for feature, old_percentage in old_dict.items():
#         if feature not in combined_dict:
#             combined_dict[feature] = old_percentage

#     # Convert the combined dictionary back to a list of FeaturePercentage objects
#     combined_analysis = [FeaturePercentage(feature=feature, percentage=percentage)
#                          for feature, percentage in combined_dict.items()]

#     combined_analysis=FeaturesPercentages(feature_percentage_list= combined_analysis)

#     return combined_analysis

# async def get_analysis_quiz_title(analysis_quiz_id:str,userId:str)-> ServiceResponse:
#     bson_id=validate_bson_id(analysis_quiz_id)
#     if not bson_id:
#         return ServiceResponse(status_code=400, msg='Bad analysis_quiz ID')
#     analysis_quiz = await get_database().get_collection('analysis_quiz').find_one({'_id':bson_id}, {
#         '_id': 0,
#         'id': {'$toString': '$_id'},
#         'title':1,
#         'description':1,

#     })
#     if not analysis_quiz:
#         return ServiceResponse(success=False,status_code=404, msg='analysis_quiz Not Found')
#     return ServiceResponse(data={'analysis_quiz': analysis_quiz})


# async def create_analysis(analysis: Analysis) -> ServiceResponse:
#     mdb_result = (
#         await get_database()
#         .get_collection("analysis")
#         .insert_one(analysis.model_dump())
#     )
#     analysis_id = str(mdb_result.inserted_id)
#     if analysis_id:
#         return ServiceResponse(data={"analysis_id": analysis_id})
#     return ServiceResponse(success=False, msg="couln't add analysis", status_code=409)
