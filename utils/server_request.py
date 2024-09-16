import requests

def upload_to_server(file_path):
    
    #改成主機IP
    
    server_url = "http://127.0.0.1:5000/upload/upload"

    files = {'file': open(file_path, 'rb')}
    response = requests.post(server_url, files=files)
    return response