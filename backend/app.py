from flask import Flask
from flask_cors import CORS

# Import blueprints
from routes.students import students_bp
from routes.courses import courses_bp
from routes.auth import auth_bp
from routes.results import results_bp
from routes.fees import fees_bp
from routes.faculty import faculty_bp
from routes.attendance import attendance_bp
from routes.feedback import feedback_bp
from routes.analysis import analysis_bp

app = Flask(__name__)

# ✅ Enable CORS for all routes and methods
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/")
def home():
    return "Hello Aitha 🚀 — Flask backend is running!"

# ✅ Register blueprints with clear prefixes
app.register_blueprint(students_bp, url_prefix="/api/students")
app.register_blueprint(courses_bp, url_prefix="/api/courses")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(results_bp, url_prefix="/api/results")
app.register_blueprint(fees_bp, url_prefix="/api/fees")   # 🔧 changed to plural for consistency
app.register_blueprint(faculty_bp, url_prefix="/api/faculty")
app.register_blueprint(attendance_bp, url_prefix="/api/attendance")
app.register_blueprint(feedback_bp, url_prefix="/api/feedback")
app.register_blueprint(analysis_bp, url_prefix="/api/analysis")

if __name__ == "__main__":
    # ✅ Use 127.0.0.1 for local dev to match frontend api.js
    app.run(host="127.0.0.1", port=5000, debug=True)
