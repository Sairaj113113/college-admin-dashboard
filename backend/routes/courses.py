from flask import Blueprint, jsonify, request
from database import SessionLocal, engine
from models import Base, Course

courses_bp = Blueprint("courses", __name__)
Base.metadata.create_all(bind=engine)

# ✅ GET: list all courses
@courses_bp.get("/")
def list_courses():
    db = SessionLocal()
    data = db.query(Course).all()
    res = [{"id": c.id, "code": c.code, "title": c.title, "faculty": c.faculty} for c in data]
    db.close()
    return jsonify(res)

# ✅ POST: add a new course
@courses_bp.post("/")
def add_course():
    payload = request.json
    db = SessionLocal()
    c = Course(
        code=payload.get("code"),
        title=payload.get("title"),
        faculty=payload.get("faculty")
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    db.close()
    return jsonify({"id": c.id}), 201

# ✅ GET: count courses
@courses_bp.get("/count")
def count_courses():
    db = SessionLocal()
    count = db.query(Course).count()
    db.close()
    return jsonify({"count": count})

# ✅ DELETE: remove a course by ID
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

# ✅ PUT: update a course by ID
@courses_bp.put("/<int:id>/")
def update_course(id):
    payload = request.json
    db = SessionLocal()
    try:
        course = db.query(Course).filter(Course.id == id).first()
        if not course:
            return jsonify({"error": "Course not found"}), 404

        # Update fields if provided
        course.code = payload.get("code", course.code)
        course.title = payload.get("title", course.title)
        course.faculty = payload.get("faculty", course.faculty)

        db.commit()
        db.refresh(course)
        return jsonify({
            "id": course.id,
            "code": course.code,
            "title": course.title,
            "faculty": course.faculty
        }), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
