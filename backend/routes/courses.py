from flask import Blueprint, jsonify, request
from backend.database import SessionLocal, engine
from backend.models import Base, Course

courses_bp = Blueprint("courses", __name__)
Base.metadata.create_all(bind=engine)

# GET: list all courses
@courses_bp.get("/")
def list_courses():
    db = SessionLocal()
    data = db.query(Course).all()
    res = [{"id": c.id, "code": c.code, "title": c.title, "faculty": c.faculty} for c in data]
    db.close()
    return jsonify(res)

# POST: add a new course
@courses_bp.post("/")
def add_course():
    db = SessionLocal()
    try:
        payload = request.json
        new_course = Course(
            code=str(payload.get("code")),
            title=str(payload.get("title")),
            faculty=str(payload.get("faculty"))
        )
        db.add(new_course)
        db.flush()
        db.commit()
        db.refresh(new_course)
        return jsonify({
            "id": new_course.id,
            "code": new_course.code,
            "title": new_course.title,
            "faculty": new_course.faculty
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# DELETE: remove a course by ID
@courses_bp.delete("/<int:id>/")
def delete_course(id):
    db = SessionLocal()
    try:
        course = db.query(Course).filter(Course.id == id).first()
        if not course:
            return jsonify({"error": "Course not found"}), 404
        db.delete(course)
        db.commit()
        return jsonify({"message": "Course deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ COUNT: total number of courses
@courses_bp.get("/count")
def count_courses():
    db = SessionLocal()
    count = db.query(Course).count()
    db.close()
    return jsonify({"count": count})
