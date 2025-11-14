from flask import Blueprint, jsonify, request
from backend.database import SessionLocal, engine
from backend.import Base, Faculty

faculty_bp = Blueprint("faculty", __name__)
Base.metadata.create_all(bind=engine)

# GET: list all faculty
@faculty_bp.get("/")
def list_faculty():
    db = SessionLocal()
    data = db.query(Faculty).all()
    res = [{"id": f.id, "name": f.name, "department": f.department} for f in data]
    db.close()
    return jsonify(res)

# POST: add a new faculty
@faculty_bp.post("/")
def add_faculty():
    db = SessionLocal()
    try:
        payload = request.json
        new_faculty = Faculty(
            name=str(payload.get("name")),
            department=str(payload.get("department"))
        )
        db.add(new_faculty)
        db.flush()
        db.commit()
        db.refresh(new_faculty)
        return jsonify({
            "id": new_faculty.id,
            "name": new_faculty.name,
            "department": new_faculty.department
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# DELETE: remove a faculty by ID
@faculty_bp.delete("/<int:id>/")
def delete_faculty(id):
    db = SessionLocal()
    try:
        record = db.query(Faculty).filter(Faculty.id == id).first()
        if not record:
            return jsonify({"error": "Faculty not found"}), 404
        db.delete(record)
        db.commit()
        return jsonify({"message": "Faculty deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ COUNT: total number of faculty
@faculty_bp.get("/count")
def count_faculty():
    db = SessionLocal()
    count = db.query(Faculty).count()
    db.close()
    return jsonify({"count": count})
