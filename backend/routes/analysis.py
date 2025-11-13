from flask import Blueprint, jsonify

analysis_bp = Blueprint("analysis", __name__)

@analysis_bp.get("/attendance")
def attendance_analysis():
    return jsonify({"message": "Attendance analysis coming soon!"})

@analysis_bp.get("/feedback")
def feedback_analysis():
    return jsonify({"message": "Feedback analysis coming soon!"})

@analysis_bp.get("/performance")
def performance_analysis():
    return jsonify({"message": "Performance analysis coming soon!"})
