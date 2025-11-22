import requests

url = "http://127.0.0.1:5000/api/predict"
data = {"attendance": 85, "marks": 70}

response = requests.post(url, json=data)
print(response.json())
