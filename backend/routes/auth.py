from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

# Hardcoded single credential
USERNAME = "admin"
PASSWORD = "admin123"

@auth_bp.post("/login")
def login():
    data = request.json
    if data.get("username") == USERNAME and data.get("password") == PASSWORD:
        # ✅ No token, just success
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
