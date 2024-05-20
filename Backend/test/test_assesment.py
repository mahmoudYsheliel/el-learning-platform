import requests
import json
import _test_config

url = _test_config.get_api_url()
token = _test_config.get_token()

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",  # adjust content type as needed
}
wrong_id = "65eface732e84b8283e8a76d"

def test_create_assesment():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest",'order':'1'}},
        headers=headers,
    )
    # check status code
    assert res.status_code == 200
    data = json.loads(res.content)
    # check if response contains id
    assert data["data"]["assesment_id"]
    
def test_create_assesment_no_order():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest"}},
        headers=headers,
    )
    # check status code
    assert res.status_code == 422
    
def test_create_assesment_no_order():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"order": "2"}},
        headers=headers,
    )
    # check status code
    assert res.status_code == 422
    
def test_create_assesment_no_auth():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest","order": "2"}},
    )
    # check status code
    assert res.status_code == 401
    
def test_get_assesment():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'last_question_number':'10','order':'10'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["assesment_id"]
    res = requests.post(url + "/get_assesment",json={'assesment_id':id}, headers=headers)
    assert res.status_code == 200
    # check if data is there and contain assesments
    assesment = res.json()["data"]["assesment"]
    assert assesment
    assert assesment["id"]==id
    assert assesment["title"]=='completetest'
    assert assesment["description"]=='completetest'
    assert assesment["order"]==10
    
    
# check unauthorized
def test_get_assesment_no_auth():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", 'order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["assesment_id"]
    res = requests.post(
        url + "/get_assesment",
        json={'assesment_id':id},
    )
    assert res.status_code == 401
    
def test_get_assesment_no_id():
    res = requests.post(url + "/get_assesment", headers=headers)
    assert res.status_code == 422
    

def test_update_assesment():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["assesment_id"]
    res = requests.post(
        url + "/update_assesment",
        json={'assesment_id':id,"update": {"title": "testupdate", "description": "testupdae",'order':'10'}},
        headers=headers
    )
    assert res.status_code == 200
    data=json.loads(res.content)
    assert data['msg']=='OK'


def test_update_assesment_no_auth():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["assesment_id"]
    res = requests.post(
        url + "/update_assesment",
        json={'assesment_id':id,"update": {"title": "testupdate", "description": "testupdae",'order':'10'}},
    )
    assert res.status_code == 401
    
    
def test_update_assesment_invalid_keys():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # check if response contains id
    id= data["data"]["assesment_id"]
    res = requests.post(
        url + "/update_assesment",
        json={'assesment_id':id,"update": {"titles": "testupdate", "description": "testupdae",'order':'10'}},
        headers=headers
    )
    assert res.status_code == 200
    data=json.loads(res.content)
    assert data['msg']=='Invalid assesment Update Keys'
    



def test_delete_assesment():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/delete_assesment",
        json={"assesment_id": assesment_id},
        headers=headers,
    )
    assert res.status_code == 200
    assert res.json()['data']=={}    
    
    
def test_delete_assesment_no_auth():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/delete_assesment",
        json={"assesment_id": assesment_id},
    )
    assert res.status_code == 401
    
    
def test_delete_assesment_no_id():
    res = requests.post(
        url + "/delete_assesment",
        headers=headers
    )
    assert res.status_code == 422
    

def test_add_question():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/get_assesment",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    # check if data is there and contain assesments
    assesment = res.json()["data"]["assesment"]
    assert assesment
    assert assesment['questions'][0]['id']==1
    
def test_add_question_wrong_assesment_id():
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":wrong_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg'] == "Bad assesment ID"
    
def test_add_question_no_auth():
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":wrong_id,'question':{'id':5,'question':'q1'} },
    )
    assert res.status_code == 401

def test_delete_question():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/delete_question",
        json={"assesment_id":assesment_id,'question_id':1},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['success'] == True
    
def test_delete_question_wrong_assesment_id():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/delete_question",
        json={"assesment_id":wrong_id,'question_id':1},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg'] == "question couldn't be deleted"
  
def test_delete_question_wrong_question_id():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/delete_question",
        json={"assesment_id":assesment_id,'question_id':5},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg'] == "question couldn't be deleted"
        
        
        
        

def test_update_question():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/update_question",
        json={"assesment_id":assesment_id,'question_id':1,'new_question':'new'},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['success'] == True
    
def test_update_question_wrong_assesment_id():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/update_question",
        json={"assesment_id":wrong_id,'question_id':1,'new_question':'new'},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg'] == "question couldn't be updated"
  
def test_delete_question_wrong_question_id():
    res = requests.post(
        url + "/create_assesment",
        json={"new_assesment": {"title": "completetest", "description": "completetest",'source':'completetest','order':'1'}},
        headers=headers,
    )
    data = json.loads(res.content)
    # Extract the assesment_id
    assesment_id = data["data"]["assesment_id"]
    res = requests.post(
        url + "/add_question",
        json={"assesment_id":assesment_id,'question':{'id':5,'question':'q1'} },
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['data']['assesment_id'] == assesment_id
    
    res = requests.post(
        url + "/update_question",
        json={"assesment_id":assesment_id,'question_id':5,'new_question':'new'},
        headers=headers,
    )
    assert res.status_code == 200
    data = json.loads(res.content)
    assert data['msg'] == "question couldn't be updated"