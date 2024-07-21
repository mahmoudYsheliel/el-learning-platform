from typing import Optional
from pydantic import BaseModel

class FeaturePercentage(BaseModel):
    feature:str
    percentage:int

class FeaturesPercentages(BaseModel):
    feature_percentage_list:Optional[list[FeaturePercentage]]=[]



class Choice(BaseModel):
    id:Optional[int]=0
    english:str
    arabic:str

class QuestionText(BaseModel):
    english:str
    arabic:str
    
class Question(BaseModel):
    id:Optional[int]=0
    question:QuestionText
    choices:list[Choice]
    correct_answer_id:int
    
class AnalysisCriteria(BaseModel):
    min_score:int
    max_score:int
    future_steps:Optional[FeaturesPercentages]=None
    personality:Optional[FeaturesPercentages]=None
    skills:Optional[FeaturesPercentages]=None

class Section(BaseModel):
    id:int
    title:str
    questions:Optional[list[Question]]=[]
    criteria:list[AnalysisCriteria]
    last_question_number:Optional[int]=0
    
    
class QuizTiming(BaseModel):
    course_to_follow_id:str
    percentage:int
    
class AnalysisQuiz(BaseModel):
    id:Optional[str] = None
    title:str
    description:Optional[str]=''
    sections:Optional[list[Section]]=[]
    duration:int
    when_to_apply:QuizTiming
    
    
    
class Answer(BaseModel):
    section_id:int
    question_id:int
    choice_id:int

    
class QuizAnalysis(BaseModel):
    quiz_id:str
    answers:list[Answer]
    future_steps:Optional[FeaturesPercentages]=None
    personality:Optional[FeaturesPercentages]=None
    skills:Optional[FeaturesPercentages]=None
    
    
class Analysis(BaseModel):
    id:Optional[str] = None
    student_id:Optional[str]=''
    future_steps:Optional[FeaturesPercentages]=None
    personality:Optional[FeaturesPercentages]=None
    skills:Optional[FeaturesPercentages]=None
    quizes_answered:Optional[list[QuizAnalysis]]=[]

    
    
    
    
    
    
    