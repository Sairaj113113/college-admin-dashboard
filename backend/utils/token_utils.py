import jwt
import datetime
from flask import request

SECRET_KEY = "your_secret_key"

def create_token(username):
    payload = {
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return None

    token = auth_header.replace("Bearer ", "")
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded["username"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
