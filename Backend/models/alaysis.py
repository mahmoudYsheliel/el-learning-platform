from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str
    
class Choice(BaseModel):
    id:Optional[int]=0
    choice:TwoLang
    image:Optional[str]=''
    score:int
    
class Question(BaseModel):
    id:Optional[int]=0
    question:TwoLang
    audio_link:Optional[str]=None
    image:Optional[str]=''
    choices:list[Choice]
    
class FeatureInfo(BaseModel):
    name:str # works as id
    title:TwoLang
    description:TwoLang
    
    
class SubSection(BaseModel):
    info_name:str
    questions:list[Question]
    last_question_number:Optional[int]=0

class Section(BaseModel):
    info_name:str
    sub_sections:list[SubSection]
    
    
class AnalysisQuiz(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    sections:list[Section]
    duration:int #seconds
    min_age:int
    max_age:int
    course_title_follow:str
    
    
    
class Answer(BaseModel):
    sub_section_name:str
    question_id:int
    choice_id:int
    
class Answers(BaseModel):
    quiz_id:str
    answers:list[Answer]
    
   
class SubSectionResult(BaseModel):
    name:str
    total_score:float
    
class SectionResults(BaseModel):
    section:str
    sub_sections:list[SubSectionResult]
    
    
class LearningStyle(BaseModel):
    name:str
    title:TwoLang
    description:TwoLang
    advice:TwoLang
    image:str
    sections_dependence:list[str] #id of subsections from iq test
    
class LearningStyleScore(BaseModel):
    learning_style_id:str #id of learning style
    score:float
    
class TrackRecommendation(BaseModel):
    name:str
    title:TwoLang
    description:TwoLang
    key_skills:list[TwoLang]
    advice:TwoLang
    sections_dependence:list[str] #id of subsections from iq test
    
class TrackRecommendationScore(BaseModel):
    tracks_recommendation_id:str #id of track recommendation
    score:float

    
    
class Analysis(BaseModel):
    id:Optional[str] = None
    student_id:str
    section_results:list[SectionResults]
    answers:Optional[Answers]=None
    learning_styles_results:list[LearningStyleScore]
    tracks_recommendation_results:list[TrackRecommendationScore]
    #   possible_careers:list[PossibleCarees]
    
    
# class FeaturePercentage(BaseModel):
#     feature:str
#     percentage:int

# class FeaturesPercentages(BaseModel):
#     feature_percentage_list:Optional[list[FeaturePercentage]]=[]



# class AnalysisCriteria(BaseModel):
#     min_score:int
#     max_score:int
#     future_steps:Optional[FeaturesPercentages]=None

    
    
# class Analysis(BaseModel):
#     id:Optional[str] = None
#     student_id:Optional[str]=''
#     analysis:Optional[FeaturesPercentages]=None

    
    
    
    
# class FeatureCriteria(BaseModel):
#     name:str #as in FeatureInfo
#     min_score:int
#     max_score:int
    
# class Career(BaseModel):
#     id:int
#     name:str
#     title:TwoLang
#     description:TwoLang
#     criteria:list[FeatureCriteria]
    
# class Careers(BaseModel):
#     id:Optional[str] = None
#     careers:list[Career]
    
    
# class PossibleCarees(BaseModel):
#     career_name:str
#     percentage:float
        

    
    
    