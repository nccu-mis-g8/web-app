import requests
import json
def upload_to_server(file_path, user_id):
    
    #改成主機IP
    
    server_url = "http://127.0.0.1:5001/upload"

    user_info = {"userId": user_id}

    files = {'file': open(file_path, 'rb')}

    # 將 user_info 轉換為 JSON 字串
    json_data = json.dumps(user_info)

    response = requests.post(server_url, files=files, data={'user_info': json_data})
    return response