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
    image:Optional[str]=''
    choices:list[Choice]
    
    
class FeatureInfo(BaseModel):
    id:Optional[str] = None
    name:str #reference to this section name
    title:TwoLang
    description:TwoLang
    global_min:int
    global_max:int
    
    
    
    
class IQSection(BaseModel):
    name:str #as in FeatureInfo
    questions:list[Question]
    last_question_number:Optional[int]=0

class IQ(BaseModel):
    title:TwoLang
    description:TwoLang
    iq_sections:list[IQSection]
    
    
class Trait(BaseModel):
    name:str #as in FeatureInfo
    questions:list[Question]
    last_question_number:Optional[int]=0

class Big5Traits(BaseModel):
    title:TwoLang
    description:TwoLang
    traits:list[Trait]
    
class PersonalityFeature(BaseModel):
    name:str #as in FeatureInfo
    questions:list[Question]
    last_question_number:Optional[int]=0
    
class Enneagram(BaseModel):
    title:TwoLang
    description:TwoLang
    personalities:list[PersonalityFeature]
    
class LearningStyleFeatue(BaseModel):
    name:str #as in FeatureInfo
    audio_link:Optional[str]=None
    questions:list[Question]
    last_question_number:Optional[int]=0

class LearningStyles(BaseModel):
    title:TwoLang
    description:TwoLang
    learning_style_features:list[LearningStyleFeatue]
    
    
class AnalysisQuiz(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    iq:IQ
    big5traits:Big5Traits
    enneagram:Enneagram
    learning_styles:LearningStyles
    duration:int #seconds
    min_age:int
    max_age:int
    course_title_follow:str
    
    
    
class Answer(BaseModel):
    section_name:str #as in FeatureInfo
    question_id:int
    choice_id:int
    
class Answers(BaseModel):
    quiz_id:str
    answers:list[Answer]
    
    
    
    
    
class FeatureCriteria(BaseModel):
    name:str #as in FeatureInfo
    min_score:int
    max_score:int
    
class Career(BaseModel):
    id:int
    name:str
    title:TwoLang
    description:TwoLang
    criteria:list[FeatureCriteria]
    
class Careers(BaseModel):
    id:Optional[str] = None
    careers:list[Career]
    
    
class PossibleCarees(BaseModel):
    career_name:str
    percentage:float
        
class FeatureResult(BaseModel):
    feature_name:str
    score:float
    
    
    
class Analysis(BaseModel):
    id:Optional[str] = None
    student_id:str
    iq_results:list[FeatureResult]
    big5traits_results:list[FeatureResult]
    enneagram_results:list[FeatureResult]
    learning_styles_results:list[FeatureResult]
    possible_careers:list[PossibleCarees]
    
    
    
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

    
    
    
    
    
    
    