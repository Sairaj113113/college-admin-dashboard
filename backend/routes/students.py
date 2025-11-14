from flask import Blueprint, jsonify, request
from backend.database import SessionLocal, engine
from backend.models import Base, Student

students_bp = Blueprint("students", __name__)
Base.metadata.create_all(bind=engine)

@students_bp.get("/")
def list_students():
    db = SessionLocal()
    data = db.query(Student).all()
    res = [{"id": s.id, "name": s.name, "email": s.email, "department": s.department} for s in data]
    db.close()
    return jsonify(res)

@students_bp.post("/")
def add_student():
    payload = request.json
    db = SessionLocal()
    s = Student(name=payload.get("name"), email=payload.get("email"), department=payload.get("department"))
    db.add(s)
    db.commit()
    db.refresh(s)
    db.close()
    return jsonify({"id": s.id}), 201

@students_bp.get("/count")
def count_students():
    db = SessionLocal()
    count = db.query(Student).count()
    db.close()
    return jsonify({"count": count})

# ✅ DELETE: remove a student by ID
@students_bp.delete("/<int:id>/")
def delete_student(id):
    db = SessionLocal()
    try:
        student = db.query(Student).filter(Student.id == id).first()
        if not student:
            return jsonify({"error": "Student not found"}), 404
        db.delete(student)
        db.commit()
        return jsonify({"message": "Student deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
