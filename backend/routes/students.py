from flask import Blueprint, jsonify, request
from database import SessionLocal, engine
from models import Base, Student

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

# ✅ PUT: update a student by ID
@students_bp.put("/<int:id>/")
def update_student(id):
    payload = request.json
    db = SessionLocal()
    try:
        student = db.query(Student).filter(Student.id == id).first()
        if not student:
            return jsonify({"error": "Student not found"}), 404

        # Update fields if provided
        student.name = payload.get("name", student.name)
        student.email = payload.get("email", student.email)
        student.department = payload.get("department", student.department)

        db.commit()
        db.refresh(student)
        return jsonify({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "department": student.department
        }), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
