import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import api from "../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await api.get("/api/attendance/");
    setAttendance(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    await api.post("/api/attendance/", {
      student_id: studentId,
      course_id: courseId,
      percentage: parseInt(percentage)
    });
    fetchAttendance();
    setStudentId("");
    setCourseId("");
    setPercentage("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/attendance/${id}/`);
      fetchAttendance();
    } catch (err) {
      console.error("Error deleting attendance:", err);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Attendance
            </Typography>
            <TextField
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Course ID"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Attendance
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Table Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Attendance Records
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Course ID</TableCell>
                  <TableCell>Percentage</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.length > 0 ? (
                  attendance.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>{a.student_id}</TableCell>
                      <TableCell>{a.course_id}</TableCell>
                      <TableCell>{a.percentage}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(a.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No attendance records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Attendance;
