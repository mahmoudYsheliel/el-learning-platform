import requests
import json
import _test_config
from datetime import datetime



url = _test_config.get_api_url()
token = _test_config.get_token()


def test_create_user():
    res = requests.post(
        url + "/signup",
        json={
            "user": {
                
                "email": "completest",
                "username": "completest",
                "hashed_pass": "5000",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }
        },
    )
    # check status code
    assert res.status_code == 200
    data = json.loads(res.content)
    print('datadata',data)
    # check if response contains id
    assert data["data"]["user_id"]


def test_create_user_no_username():
    res = requests.post(
        url + "/signup",
        json={"user":{
                "hashed_pass": "5000",
                "email": "uncompletest",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }},
    )
    # check status code
    assert res.status_code == 422


def test_create_user_no_password():
    res = requests.post(
        url + "/signup",
        json={"user":{
                "username": "uncompletest",
                "email": "uncompletest",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }},
    )
    # check status code
    assert res.status_code == 422


def test_create_user_no_email():
    res = requests.post(
        url + "/signup",
        json={"user":{
                "username": "uncompletest",
                "hashed_pass": "5000",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }},
    )
    
    # check status code
    assert res.status_code == 422
    
    
def test_create_user_repeated_username():
    res = requests.post(
        url + "/signup",
        json={"user":{
                "username": "completest",
                "email":'uncompletest',
                "hashed_pass": "5000",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }},
    )
    
    # check status code
    data = json.loads(res.content)
    assert data["status_code"] == 409
    assert data['msg'] == 'username is already used once'
    
def test_create_user_repeated_email():
    res = requests.post(
        url + "/signup",
        json={"user":{
                "username": "uncompletest",
                "email":'completest',
                "hashed_pass": "5000",
                "phone_number": "01017897738",
                "role": "0",
                'created_at':datetime.now().isoformat()
            }},
    )
    
    # check status code
    data = json.loads(res.content)
    assert data["status_code"] == 409
    assert data['msg'] == 'email is already used once'

