from flask import Blueprint, jsonify
from database import SessionLocal
from models import Student, Attendance, Result
from mymodel import predict_risk   # ✅ your ML function

risk_bp = Blueprint("risk", __name__)

# ✅ GET: risk for a single student
@risk_bp.get("/<int:student_id>")
def risk_for_student(student_id):
    db = SessionLocal()
    try:
        student = db.query(Student).filter(Student.id == student_id).first()
        attendance = db.query(Attendance).filter(Attendance.student_id == student_id).first()
        result = db.query(Result).filter(Result.student_id == student_id).first()

        if not student or not attendance or not result:
            return jsonify({"error": "Incomplete data"}), 404

        # Run ML prediction
        status = predict_risk(attendance.percentage, result.marks)

        return jsonify({
            "id": student.id,
            "name": student.name,
            "department": student.department,
            "attendance": attendance.percentage,
            "marks": result.marks,
            "risk": status
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ GET: risk summary for all students
@risk_bp.get("/summary")
def risk_summary():
    db = SessionLocal()
    try:
        students = db.query(Student).all()
        res = []
        for s in students:
            attendance = db.query(Attendance).filter(Attendance.student_id == s.id).first()
            result = db.query(Result).filter(Result.student_id == s.id).first()

            if attendance and result:
                status = predict_risk(attendance.percentage, result.marks)
            else:
                status = "No data"

            res.append({
                "id": s.id,
                "name": s.name,
                "department": s.department,
                "attendance": attendance.percentage if attendance else None,
                "marks": result.marks if result else None,
                "risk": status
            })

        return jsonify(res), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
