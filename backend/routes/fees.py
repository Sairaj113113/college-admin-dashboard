from flask import Blueprint, jsonify, request
from database import SessionLocal, engine
from models import Base, Fee
from sqlalchemy import func   # ✅ needed for sum()

fees_bp = Blueprint("fees", __name__)
Base.metadata.create_all(bind=engine)

# GET: list all fees
@fees_bp.get("/")
def list_fees():
    db = SessionLocal()
    data = db.query(Fee).all()
    res = [
        {"id": f.id, "student_id": f.student_id, "amount": f.amount, "status": f.status}
        for f in data
    ]
    db.close()
    return jsonify(res)

# POST: add a new fee
@fees_bp.post("/")
def add_fee():
    db = SessionLocal()
    try:
        payload = request.json
        new_fee = Fee(
            student_id=int(payload.get("student_id")),
            amount=int(payload.get("amount")),
            status=str(payload.get("status"))
        )
        db.add(new_fee)
        db.flush()
        db.commit()
        db.refresh(new_fee)
        return jsonify({
            "id": new_fee.id,
            "student_id": new_fee.student_id,
            "amount": new_fee.amount,
            "status": new_fee.status
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# DELETE: remove a fee by ID
@fees_bp.delete("/<int:id>/")
def delete_fee(id):
    db = SessionLocal()
    try:
        fee = db.query(Fee).filter(Fee.id == id).first()
        if not fee:
            return jsonify({"error": "Fee not found"}), 404
        db.delete(fee)
        db.commit()
        return jsonify({"message": "Fee deleted"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# ✅ TOTAL: sum of all fees
@fees_bp.get("/total")
def total_fees():
    db = SessionLocal()
    try:
        total = db.query(func.sum(Fee.amount)).scalar() or 0
        return jsonify({"total": total})
    finally:
        db.close()
