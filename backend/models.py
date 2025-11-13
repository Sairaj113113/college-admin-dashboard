from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# ✅ Student model
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

# ✅ Course model
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    faculty = Column(String, nullable=False)

# ✅ Faculty model
class Faculty(Base):
    __tablename__ = "faculty"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)

# ✅ Fee model
class Fee(Base):
    __tablename__ = "fees"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(String, nullable=False)  # Paid or Pending

# ✅ Result model
class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    marks = Column(Integer, nullable=False)

# ✅ Attendance model
class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    percentage = Column(Integer, nullable=False)

# ✅ Feedback model
class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, nullable=False)      # Who gave feedback
    message = Column(String, nullable=False)   # Feedback text
