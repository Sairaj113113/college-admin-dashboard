from flask import Blueprint, jsonify, request
from database import SessionLocal, engine
from models import Base, Feedback

feedback_bp = Blueprint("feedback", __name__)
Base.metadata.create_all(bind=engine)

@feedback_bp.get("/")
def list_feedback():
    db = SessionLocal()
    data = db.query(Feedback).all()
    res = [{"id": f.id, "user": f.user, "message": f.message} for f in data]
    db.close()
    return jsonify(res)

@feedback_bp.post("/")
def add_feedback():
    db = SessionLocal()
    try:
        payload = request.json
        new_feedback = Feedback(
            user=str(payload.get("user")),
            message=str(payload.get("message"))
        )
        db.add(new_feedback)
        db.flush()
        db.commit()
        db.refresh(new_feedback)
        return jsonify({
            "id": new_feedback.id,
            "user": new_feedback.user,
            "message": new_feedback.message
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ DELETE: remove feedback by ID
@feedback_bp.delete("/<int:id>/")
def delete_feedback(id):
    db = SessionLocal()
    try:
        record = db.query(Feedback).filter(Feedback.id == id).first()
        if not record:
            return jsonify({"error": "Feedback not found"}), 404
        db.delete(record)
        db.commit()
        return jsonify({"message": "Feedback deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
