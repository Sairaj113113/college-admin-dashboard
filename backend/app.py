from flask import Flask, send_from_directory, render_template
from flask_cors import CORS

# Import blueprints
from backend.routes.students import students_bp
from backend.routes.courses import courses_bp
from backend.routes.auth import auth_bp
from backend.routes.results import results_bp
from backend.routes.fees import fees_bp
from backend.routes.faculty import faculty_bp
from backend.routes.attendance import attendance_bp
from backend.routes.feedback import feedback_bp
from backend.routes.analysis import analysis_bp


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

# ✅ Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path.startswith("static/"):
        return send_from_directory(app.static_folder, path.replace("static/", ""), max_age=0)
    return render_template("index.html")

# ✅ Optional health check
@app.route("/api/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
