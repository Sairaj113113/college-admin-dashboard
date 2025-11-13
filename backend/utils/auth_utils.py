import jwt
import datetime

SECRET_KEY = "your_secret_key"

def create_token(username):
    payload = {
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token():
    from flask import request
    token = request.headers.get("Authorization")
    if not token:
        return None
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded["username"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
