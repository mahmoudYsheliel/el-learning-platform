import requests
import json
import _test_config
from datetime import datetime

url = _test_config.get_api_url()
token = _test_config.get_token()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",  # adjust content type as needed
}
# user id who will be in database
id = "65eface732e84b8283e8a76d"
wrong_id = "wrong_id"


# check success create chat
def test_create_chat():
    res = requests.post(
        url + "/create_chat",
        json={"new_chat": {"participants": [id]}},
        headers=headers,
    )
    # check status code
    assert res.status_code == 200
    data = json.loads(res.content)
    # check if response contains id
    assert data["data"]["chat_id"]


# check fail create chat no auth
def test_create_chat_no_auth():
    res = requests.post(
        url + "/create_chat",
        json={"new_chat": {"participants": [id]}},
    )
    # check status code
    assert res.status_code == 401


def test_creat_chat_no_participants():
    res = requests.post(
        url + "/create_chat",
        json={},
        headers=headers,
    )
    assert res.status_code == 422








def test_get_messages_no_auth():
    res = requests.post(
        url + "/create_chat",
        json={"new_chat": {"participants": [id]}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    chat_id = data["data"]["chat_id"]
    res = requests.post(url + "/get_chat", json={"chat_id": chat_id})
    assert res.status_code == 401




    
       
def test_send_message():
    res = requests.post(
        url + "/create_chat",
        json={"new_chat": {"participants": [id]}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    chat_id = data["data"]["chat_id"]
    res = requests.post(url + "/get_chat", json={"chat_id": chat_id}, headers=headers)
    assert res.status_code == 200

    # send message
    res = requests.post(
        url + "/send_message",
        json={
            "chat_id": chat_id,
            "message": {
                "sender": id,
                "message": "m1",
                "sent_at": datetime.now().isoformat(),
            },
        },
        headers=headers,
    )
    data = json.loads(res.content)
    assert data["data"]["chat_id"]==chat_id
        
    
def test_send_messages_bad_id():

    # send message
    res = requests.post(
        url + "/send_message",
        json={
            "chat_id": id,
            "message": {
                "sender": id,
                "message": "m1",
                "sent_at": datetime.now().isoformat(),
            },
        },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg']=='bad chat id'
    assert data['status_code']==400
    
def test_send_messages_no_id():
    res = requests.post(
        url + "/create_chat",
        json={"new_chat": {"participants": [id]}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    chat_id = data["data"]["chat_id"]
    res = requests.post(url + "/get_chat", json={"chat_id": id}, headers=headers)
    assert res.status_code == 200

    # send message
    res = requests.post(
        url + "/send_message",
        json={
            "message": {
                "sender": id,
                "message": "m1",
                "sent_at": datetime.now().isoformat(),
            },
        },
        headers=headers,
    )
    assert res.status_code == 422
