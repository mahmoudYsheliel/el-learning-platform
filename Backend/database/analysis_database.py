from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
import numpy
from models.alaysis import (
    TwoLang,
    Choice,
    Question,
    FeatureInfo,
    IQSection,
    IQ,
    Trait,
    Big5Traits,
    PersonalityFeature,
    Enneagram,
    LearningStyleFeatue,
    LearningStyles,
    AnalysisQuiz,
    Answer,
    Answers,
    FeatureCriteria,
    Career,
    Careers,
    FeatureResult,
    Analysis,
    PossibleCarees,
)


async def create_careers_list(careers: Careers) -> ServiceResponse:
    mdb_result = (
        await get_database().get_collection("careers").insert_one(careers.model_dump())
    )
    careers_id = str(mdb_result.inserted_id)
    if careers_id:
        return ServiceResponse(data={"careers_id": careers_id})
    return ServiceResponse(success=False, msg="couln't add careers", status_code=409)


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
                "global_min": 1,
                "global_max": 1,
            },
        )
        .to_list(length=None)
    )
    if mdb_result:
        return ServiceResponse(data={"features_info": mdb_result})
    return ServiceResponse(success=False, msg="couln't find features_info", status_code=409)

async def get_all_careers() -> ServiceResponse:
    mdb_result = (
        await get_database()
        .get_collection("careers")
        .find_one(
            {},
            {
                "_id": 0,
                "id": {"$toString": "$_id"},
                "careers": 1,
            },
        )
    )
    if mdb_result:
        return ServiceResponse(data={"careers": mdb_result})
    return ServiceResponse(success=False, msg="couln't find careers", status_code=409)



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
                "iq": 1,
                "big5traits": 1,
                "enneagram": 1,
                "learning_styles": 1,
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
                "iq_results": 1,
                "big5traits_results": 1,
                "enneagram_results": 1,
                "learning_styles_results": 1,
                "possible_careers": 1,
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
                "iq": 1,
                "big5traits": 1,
                "enneagram": 1,
                "learning_styles": 1,
            },
        )
    )
    scores = calculate_scores(answers, analysis_quiz)
    careers = (
        await get_database().get_collection("careers").find_one({}, {"_id": 0, "id": 0})
    )
    career_scores = calculate_career_alignment(scores, careers)

    possible_careers = [
        PossibleCarees(career_name=career, percentage=career_scores[career])
        for career in career_scores
    ]
    iq_results = [
        FeatureResult(feature_name=iq_section["name"], score=iq_section["total_score"])
        for iq_section in scores["iq"]["sections"]
    ]
    big5traits_results = [
        FeatureResult(feature_name=trait["name"], score=trait["total_score"])
        for trait in scores["big5traits"]["sections"]
    ]
    enneagram_results = [
        FeatureResult(feature_name=personna["name"], score=personna["total_score"])
        for personna in scores["enneagram"]["sections"]
    ]
    learning_styles_results = [
        FeatureResult(
            feature_name=learning_style["name"], score=learning_style["total_score"]
        )
        for learning_style in scores["learning_styles"]["sections"]
    ]

    analysis = Analysis(
        student_id=student_id,
        iq_results=iq_results,
        big5traits_results=big5traits_results,
        enneagram_results=enneagram_results,
        learning_styles_results=learning_styles_results,
        possible_careers=possible_careers,
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


def aplly_gauss(min: int, max: int, score: int) -> float:
    av = (min + max) / 2
    std = max - min
    power = -0.5 * ((score - av) / std) * ((score - av) / std)
    return numpy.power(numpy.e, power * 0.25)


def calculate_career_alignment(scores: dict, careers: dict) -> list:
    all_careers_list = careers["careers"]
    career_fit_percentage = {}

    for career in all_careers_list:
        career_fit_percentage[career["name"]] = 0

    for score_section in scores["iq"]["sections"]:
        for career in all_careers_list:
            criteria = next(
                (
                    criteria
                    for criteria in career["criteria"]
                    if criteria["name"] == score_section["name"]
                ),
                None,
            )
            if criteria:
                score = aplly_gauss(
                    criteria["min_score"],
                    criteria["max_score"],
                    score_section["total_score"],
                )
                career_fit_percentage[career["name"]] += score * 20

    for score_section in scores["big5traits"]["sections"]:
        for career in all_careers_list:
            criteria = next(
                (
                    criteria
                    for criteria in career["criteria"]
                    if criteria["name"] == score_section["name"]
                ),
                None,
            )
            if criteria:
                score = aplly_gauss(
                    criteria["min_score"],
                    criteria["max_score"],
                    score_section["total_score"],
                )
                career_fit_percentage[career["name"]] += score * 10

    for score_section in scores["enneagram"]["sections"]:
        for career in all_careers_list:
            criteria = next(
                (
                    criteria
                    for criteria in career["criteria"]
                    if criteria["name"] == score_section["name"]
                ),
                None,
            )
            if criteria:
                score = aplly_gauss(
                    criteria["min_score"],
                    criteria["max_score"],
                    score_section["total_score"],
                )
                career_fit_percentage[career["name"]] += score * 20

    for score_section in scores["learning_styles"]["sections"]:
        for career in all_careers_list:
            criteria = next(
                (
                    criteria
                    for criteria in career["criteria"]
                    if criteria["name"] == score_section["name"]
                ),
                None,
            )
            if criteria:
                score = aplly_gauss(
                    criteria["min_score"],
                    criteria["max_score"],
                    score_section["total_score"],
                )
                career_fit_percentage[career["name"]] += score * 5

    return career_fit_percentage


def calculate_scores(answers: Answers, analysis_quiz: dict) -> dict:
    answers_list = answers.answers

    all_sections = {"iq": [], "big5traits": [], "enneagram": [], "learning_styles": []}
    total = 0
    sections = {"name": "iq", "sections": []}
    for section in analysis_quiz["iq"]["iq_sections"]:
        section_score = {"name": section["name"], "total_score": 0}
        total = 0
        for question in section["questions"]:
            for choice in question["choices"]:
                score = next(
                    (
                        choice["score"]
                        for answer in answers_list
                        if answer.section_name == section["name"]
                        and answer.question_id == question["id"]
                        and choice["id"] == answer.choice_id
                    ),
                    None,
                )
                if score:
                    total += score
        section_score["total_score"] = total * 7
        sections["sections"].append(section_score)
    combined_sections = {}
    for section in sections["sections"]:
        name = section["name"]
        score = section["total_score"]
        if name in combined_sections:
            combined_sections[name] += score
        else:
            combined_sections[name] = score
    combined_sections_list = [
        {"name": name, "total_score": total_score}
        for name, total_score in combined_sections.items()
    ]
    sections["sections"] = combined_sections_list
    all_sections["iq"] = sections

    sections = {"name": "big5traits", "sections": []}
    for section in analysis_quiz["big5traits"]["traits"]:
        section_score = {"name": section["name"], "total_score": 0}
        total = 0
        for question in section["questions"]:
            for choice in question["choices"]:
                score = next(
                    (
                        choice["score"]
                        for answer in answers_list
                        if answer.section_name == section["name"]
                        and answer.question_id == question["id"]
                        and choice["id"] == answer.choice_id
                    ),
                    None,
                )
                if score:
                    total += score
        section_score["total_score"] = total
        sections["sections"].append(section_score)
    combined_sections = {}
    for section in sections["sections"]:
        name = section["name"]
        score = section["total_score"]
        if name in combined_sections:
            combined_sections[name] += score
        else:
            combined_sections[name] = score
    combined_sections_list = [
        {"name": name, "total_score": total_score}
        for name, total_score in combined_sections.items()
    ]
    sections["sections"] = combined_sections_list
    all_sections["big5traits"] = sections

    sections = {"name": "enneagram", "sections": []}
    for section in analysis_quiz["enneagram"]["personalities"]:
        section_score = {"name": section["name"], "total_score": 0}
        total = 0
        for question in section["questions"]:
            for choice in question["choices"]:
                score = next(
                    (
                        choice["score"]
                        for answer in answers_list
                        if answer.section_name == section["name"]
                        and answer.question_id == question["id"]
                        and choice["id"] == answer.choice_id
                    ),
                    None,
                )
                if score:
                    total += score
        section_score["total_score"] = total
        sections["sections"].append(section_score)
    combined_sections = {}
    for section in sections["sections"]:
        name = section["name"]
        score = section["total_score"]
        if name in combined_sections:
            combined_sections[name] += score
        else:
            combined_sections[name] = score
    combined_sections_list = [
        {"name": name, "total_score": total_score}
        for name, total_score in combined_sections.items()
    ]
    sections["sections"] = combined_sections_list
    all_sections["enneagram"] = sections

    sections = {"name": "learning_styles", "sections": []}
    for section in analysis_quiz["learning_styles"]["learning_style_features"]:
        section_score = {"name": section["name"], "total_score": 0}
        total = 0
        for question in section["questions"]:
            for choice in question["choices"]:
                score = next(
                    (
                        choice["score"]
                        for answer in answers_list
                        if answer.section_name == section["name"]
                        and answer.question_id == question["id"]
                        and choice["id"] == answer.choice_id
                    ),
                    None,
                )
                if score:
                    total += score
        section_score["total_score"] = total
        sections["sections"].append(section_score)
    combined_sections = {}

    for section in sections["sections"]:
        name = section["name"]
        score = section["total_score"]
        if name in combined_sections:
            combined_sections[name] += score
        else:
            combined_sections[name] = score
    combined_sections_list = [
        {"name": name, "total_score": total_score}
        for name, total_score in combined_sections.items()
    ]
    sections["sections"] = combined_sections_list
    all_sections["learning_styles"] = sections

    return all_sections


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
