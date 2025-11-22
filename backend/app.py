import os
from flask import Flask, send_from_directory, render_template, request, jsonify
from flask_cors import CORS

# ✅ Import blueprints (no 'backend.' prefix since you're inside backend/)
from routes.students import students_bp
from routes.courses import courses_bp
from routes.auth import auth_bp
from routes.results import results_bp
from routes.fees import fees_bp
from routes.faculty import faculty_bp
from routes.attendance import attendance_bp
from routes.feedback import feedback_bp
from routes.analysis import analysis_bp

app = Flask(__name__, static_folder="static", template_folder="templates")

# ✅ Enable CORS for API routes only
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# ✅ Register blueprints with clear prefixes
app.register_blueprint(students_bp, url_prefix="/api/students")
app.register_blueprint(courses_bp, url_prefix="/api/courses")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(results_bp, url_prefix="/api/results")
app.register_blueprint(fees_bp, url_prefix="/api/fees")
app.register_blueprint(faculty_bp, url_prefix="/api/faculty")
app.register_blueprint(attendance_bp, url_prefix="/api/attendance")
app.register_blueprint(feedback_bp, url_prefix="/api/feedback")
app.register_blueprint(analysis_bp, url_prefix="/api/analysis")

# ✅ Prediction API (direct logic, no pickle needed)
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        attendance = data.get("attendance")
        marks = data.get("marks")

        if attendance is None or marks is None:
            return jsonify({"error": "Missing attendance or marks"}), 400

        # Simple risk logic
        if attendance < 75 or marks < 50:
            status = "At Risk"
        else:
            status = "Safe"

        return jsonify({"status": status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path.startswith(("js/", "css/", "media/")):
        return send_from_directory(
            os.path.join(app.static_folder, path.split("/")[0]),
            "/".join(path.split("/")[1:])
        )
    return render_template("index.html")

# ✅ Optional health check
@app.route("/api/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
