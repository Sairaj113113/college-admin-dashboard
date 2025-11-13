from flask import Blueprint, jsonify, request
from backend.database import SessionLocal, engine
from models import Base, Attendance

# Create blueprint
attendance_bp = Blueprint("attendance", __name__)
Base.metadata.create_all(bind=engine)

# GET: list all attendance records
@attendance_bp.get("/")
def list_attendance():
    db = SessionLocal()
    data = db.query(Attendance).all()
    res = [
        {
            "id": a.id,
            "student_id": a.student_id,
            "course_id": a.course_id,
            "percentage": a.percentage
        }
        for a in data
    ]
    db.close()
    return jsonify(res)

# POST: add a new attendance record
@attendance_bp.post("/")
def add_attendance():
    db = SessionLocal()
    try:
        payload = request.json
        new_attendance = Attendance(
            student_id=int(payload.get("student_id")),
            course_id=str(payload.get("course_id")),
            percentage=int(payload.get("percentage"))
        )
        db.add(new_attendance)
        db.flush()
        db.commit()
        db.refresh(new_attendance)
        return jsonify({
            "id": new_attendance.id,
            "student_id": new_attendance.student_id,
            "course_id": new_attendance.course_id,
            "percentage": new_attendance.percentage
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# DELETE: remove an attendance record
@attendance_bp.delete("/<int:id>/")
def delete_attendance(id):
    db = SessionLocal()
    try:
        record = db.query(Attendance).filter(Attendance.id == id).first()
        if not record:
            return jsonify({"error": "Attendance not found"}), 404
        db.delete(record)
        db.commit()
        return jsonify({"message": "Attendance deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
