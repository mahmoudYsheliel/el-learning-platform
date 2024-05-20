import requests
import json
import _test_config

url = _test_config.get_api_url()
token = _test_config.get_token()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",  # adjust content type as needed
}


# check success create lesson
def test_create_lesson():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    # check status code
    assert res.status_code == 200
    data = json.loads(res.content)
    # check if response contains id
    assert data["data"]["lesson_id"]


# check fail create lesson no auth
def test_create_lesson_no_auth():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
    )
    # check status code
    assert res.status_code == 401


def test_no_scourse():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": { "description": "completetest",'order':'1'}},
        headers=headers,
    )
    assert res.status_code == 422
    
def test_no_order():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": { "description": "completetest",'source':'completetest'}},
        headers=headers,
    )
    assert res.status_code == 422
    
def test_strng_order():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": { "description": "completetest",'source':'completetest'}},
        headers=headers,
    )
    assert res.status_code == 422
    

def test_no_title():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": { "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    assert res.status_code == 422





def test_get_lesson():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(url + "/get_lesson",json={'lesson_id':id}, headers=headers)
    assert res.status_code == 200
    # check if data is there and contain lessons
    lesson = res.json()["data"]["lesson"]
    assert lesson
    assert lesson["id"]
    assert lesson["title"]
    assert lesson["description"]
    assert lesson["order"]
    assert lesson["source"]


# check unauthorized
def test_get_lesson_no_auth():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/get_lesson",
        json={'lesson_id':id},
    )
    assert res.status_code == 401

def test_get_lesson_no_id():
    res = requests.post(url + "/get_lesson", headers=headers)
    assert res.status_code == 422
    
    
    
    
    
def test_update_lesson():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/update_lesson",
        json={'lesson_id':id, "new_lesson": {"title": "testupdate", "description": "testupdae",'source':'testupdate','order':'1'}},
        headers=headers
    )
    assert res.status_code == 200
    assert res.json()['data']=={}
    
def test_update_lesson_no_title():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/update_lesson",
        json={'lesson_id':id, "new_lesson": { "description": "testupdae",'source':'testupdate','order':'1'}},
        headers=headers
    )
    assert res.status_code == 200
    

def test_update_lesson_no_source():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/update_lesson",
        json={'lesson_id':id, "new_lesson": {"title": "testupdate", "description": "testupdae",'order':'1'}},
        headers=headers
    )
    assert res.status_code == 200

def test_update_lesson_no_lesson():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/update_lesson",
        json={'lesson_id':id},
        headers=headers
    )
    assert res.status_code == 422

def test_update_lesson_no_id():
    res = requests.post(
        url + "/update_lesson",
        json={"new_lesson": {"title": "testupdate", "description": "testupdae",'source':'testupdate','order':'1'}},
        headers=headers
    )
    assert res.status_code == 422
    

def test_update_lesson_wrong_keys():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["lesson_id"]
    res = requests.post(
        url + "/update_lesson",
        json={'lesson_id':id,"new_lesson": {"titles": "testupdate", "description": "testupdae",'source':'testupdate','order':'1'}},
        headers=headers
    )
    assert res.status_code == 200
    data=json.loads(res.content)
    assert data['msg']=='Invalid Lesson Update Keys'






def test_delete_lesson():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the lesson_id
    lesson_id = data["data"]["lesson_id"]
    res = requests.post(
        url + "/delete_lesson",
        json={"lesson_id": lesson_id},
        headers=headers,
    )
    assert res.status_code == 200
    assert res.json()['data']=={}

def test_delete_lesson_no_auth():
    res = requests.post(
        url + "/create_lesson",
        json={"new_lesson": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the lesson_id
    lesson_id = data["data"]["lesson_id"]
    res = requests.post(
        url + "/delete_lesson",
        json={"lesson_id": lesson_id},
    )
    assert res.status_code == 401
    
def test_delete_lesson_no_id():
    res = requests.post(
        url + "/delete_lesson",
        headers=headers
    )
    assert res.status_code == 422