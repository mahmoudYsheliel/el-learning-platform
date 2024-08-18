from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn
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
    analysis_api
)
import os
from fastapi.responses import FileResponse

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


# from fastapi import Request
# @app.get("/{full_path:path}")
# async def catch_all(request: Request, full_path: str):
#     if os.path.exists(os.path.join("dist", full_path)):
#         return await StaticFiles(directory="dist").get_response(full_path, request)
#     return FileResponse(os.path.join("dist", "index.html"))

# @app.get("/{full_path:path}")
# async def catch_all(full_path:str):
#     index_path = os.path.join('dist','index.html')
#     return FileResponse(index_path)

# mount static files server
app.mount("/", StaticFiles(directory="dist", html=True), name="dist")
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080)
    
