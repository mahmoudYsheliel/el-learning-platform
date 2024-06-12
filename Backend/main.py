from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import database.mongo_driver as mdb
from routes import (
    user_api,
    lesson_api,
    chat_api,
    student_assesment_answer_api,
    quiz_api,
    student_quiz_answer_api,
    course_api,
    category_api,
    enrollment_api,
    assesment_api,
    program_api
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await mdb.mongodb_connect()
    yield
    # clean up resources here


app = FastAPI(
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_api.router)
app.include_router(lesson_api.router)
app.include_router(chat_api.router)
app.include_router(assesment_api.router)
app.include_router(student_assesment_answer_api.router)
app.include_router(quiz_api.router)
app.include_router(student_quiz_answer_api.router)
app.include_router(course_api.router)
app.include_router(category_api.router)
app.include_router(enrollment_api.router)
app.include_router(program_api.router)
