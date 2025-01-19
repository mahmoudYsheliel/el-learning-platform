from fastapi import APIRouter, Body, Depends, BackgroundTasks
from models.user import User, Child
from database.user_database import validate_user, create_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database

from lib.crypto import create_access_token
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from models.user import Token
from lib.crypto import auth_user
import database.user_database as user_database
from lib.email_service import *

router = APIRouter()


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token | ServiceResponse:
    valid = await validate_user(form_data.username, form_data.password)
    if not valid:
        return ServiceResponse(success=False, msg="no such user", status_code=404)

    user = await get_database().get_collection("user").find_one({"email": form_data.username}, {'id': {'$toString': '$_id'}, })
    userid = user['id']
    access_token_expires = timedelta(minutes=1e6)
    access_token = create_access_token(
        data={'userId': userid}, expires_delta=access_token_expires
    )
    print(Token(access_token=access_token))
    return Token(access_token=access_token)


@router.post("/switch_to_child")
async def switc_to_child(child_id: str = Body(embed=True), userId: str = Depends(auth_user)):
    user_children = await get_database().get_collection('parent').find_one({'user_id': str(userId)}, {'children': 1})
    if not user_children:
        return ServiceResponse(success=False, msg='Could not Find Children')
    if child_id in user_children['children']:
        access_token_expires = timedelta(minutes=1e6)
        access_token = create_access_token(
            data={'userId': child_id}, expires_delta=access_token_expires
        )
        return ServiceResponse(data={'access_token': access_token})
    return ServiceResponse(success=False, msg='Could not Find Child')


@router.post('/signup')
async def signup(user: User = Body(embed=True)):
    try:
        return await create_user(user)
    except:
        return ServiceResponse(success=False, msg="couldn't add user", status_code=400)


@router.post('/personal_info')
async def personal_info(userId: str = Depends(auth_user)):
    res = await user_database.personal_info(userId)
    return res


@router.post('/personal_another_user_info')
async def personal_info(another_userId: str = Body(embed=True), userId: str = Depends(auth_user)):
    res = await user_database.personal_info(another_userId)
    return res


@router.post('/update_user_info')
async def update_user_info(user_type_specific_info: dict = Body(embed=True), update: dict = Body(embed=True), userId: str = Depends(auth_user)):
    res = await user_database.update_user_info(userId, update, user_type_specific_info)
    return res


@router.post('/update_another_user_info')
async def update_user_info(user_type_specific_info: dict = Body(embed=True), update: dict = Body(embed=True), user_to_change: str = Body(embed=True), userId: str = Depends(auth_user)):
    res = await user_database.update_user_info(user_to_change, update, user_type_specific_info)
    return res


@router.post('/add_child')
async def add_child(user: User = Body(embed=True), child: Child = Body(embed=True), userId: str = Depends(auth_user)):
    res = await user_database.add_child(user, child, userId)
    return res


@router.post('/get_all_users')
async def get_all_users(userId: str = Depends(auth_user)):
    res = await user_database.get_all_users(userId)
    return res


@router.post('/get_instructors')
async def get_all_users(userId: str = Depends(auth_user)):
    res = await user_database.get_instructors(userId)
    return res


@router.post("/send_email")
async def send_email_route(background_tasks: BackgroundTasks, subject: str = Body(embed=True), body: str = Body(embed=True), to_email: str = Body(embed=True)):
    background_tasks.add_task(send_email, subject, body, to_email)
    return {"message": "Email is being sent in the background."}


@router.post("/send_page")
async def send_page(request: EmailRequest = Body(embed=True)):
    pdf_path = "TraceReport.pdf"  # Temporary path for the generated PDF
    try:
        # Generate the PDF from the received HTML content
        generate_pdf_from_html(request.html_content, pdf_path)
        # Send the PDF via email
        send_email_with_attachment(
            subject=request.subject,
            to_email=request.recipient,
            body=request.body,
            attachment_path=pdf_path,
            img_base64=request.image_base64,)
        
        return {"message": "Email sent successfully!"}
    finally:
        pass
