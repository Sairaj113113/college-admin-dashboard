from flask import Blueprint, jsonify, request
from database import SessionLocal, engine
from models import Base, Result

results_bp = Blueprint("results", __name__)
Base.metadata.create_all(bind=engine)

# GET: list all results
@results_bp.get("/")
def list_results():
    db = SessionLocal()
    data = db.query(Result).all()
    res = [{"id": r.id, "student_id": r.student_id, "course_id": r.course_id, "marks": r.marks} for r in data]
    db.close()
    return jsonify(res)

# POST: add a new result
@results_bp.post("/")
def add_result():
    db = SessionLocal()
    try:
        payload = request.json
        new_result = Result(
            student_id=int(payload.get("student_id")),
            course_id=str(payload.get("course_id")),
            marks=int(payload.get("marks"))
        )
        db.add(new_result)
        db.flush()
        db.commit()
        db.refresh(new_result)
        return jsonify({
            "id": new_result.id,
            "student_id": new_result.student_id,
            "course_id": new_result.course_id,
            "marks": new_result.marks
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# DELETE: remove a result by ID
@results_bp.delete("/<int:id>/")
def delete_result(id):
    db = SessionLocal()
    try:
        result = db.query(Result).filter(Result.id == id).first()
        if not result:
            return jsonify({"error": "Result not found"}), 404
        db.delete(result)
        db.commit()
        return jsonify({"message": "Result deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ PUT: update a result by ID
@results_bp.put("/<int:id>/")
def update_result(id):
    payload = request.json
    db = SessionLocal()
    try:
        result = db.query(Result).filter(Result.id == id).first()
        if not result:
            return jsonify({"error": "Result not found"}), 404

        # Update fields if provided
        if "student_id" in payload:
            result.student_id = int(payload["student_id"])
        if "course_id" in payload:
            result.course_id = str(payload["course_id"])
        if "marks" in payload:
            result.marks = int(payload["marks"])

        db.commit()
        db.refresh(result)
        return jsonify({
            "id": result.id,
            "student_id": result.student_id,
            "course_id": result.course_id,
            "marks": result.marks
        }), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
