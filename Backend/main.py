from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import database.mongo_driver as mdb
from routes import (
    user_api,
    lesson_api,
    chat_api,
    quiz_api,
    course_api,
    category_api,
    enrollment_api,
    program_api,
    analysis_api,
    promo_code_api,
    plan_api,
    simulation_api,
    project_api,
    activity_api,
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
app.include_router(quiz_api.router)
app.include_router(course_api.router)
app.include_router(category_api.router)
app.include_router(enrollment_api.router)
app.include_router(program_api.router)
app.include_router(analysis_api.router)
app.include_router(promo_code_api.router)
app.include_router(plan_api.router)
app.include_router(simulation_api.router)
app.include_router(project_api.router)
app.include_router(activity_api.router)


    
# #Mount the static files directory
app.mount("/", StaticFiles(directory="dist", html=True), name="dist")


# if __name__ == '__main__':
#     uvicorn.run(app, host='0.0.0.0', port=8080)
    
