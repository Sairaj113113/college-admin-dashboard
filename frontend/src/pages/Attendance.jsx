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
  const [searchTerm, setSearchTerm] = useState("");

  // edit states
  const [editId, setEditId] = useState(null);
  const [editStudentId, setEditStudentId] = useState("");
  const [editCourseId, setEditCourseId] = useState("");
  const [editPercentage, setEditPercentage] = useState("");

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

  const handleEdit = (a) => {
    setEditId(a.id);
    setEditStudentId(a.student_id);
    setEditCourseId(a.course_id);
    setEditPercentage(a.percentage);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/attendance/${editId}/`, {
        student_id: editStudentId,
        course_id: editCourseId,
        percentage: parseInt(editPercentage)
      });
      fetchAttendance();
      setEditId(null);
      setEditStudentId("");
      setEditCourseId("");
      setEditPercentage("");
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  const filteredAttendance = attendance.filter(a =>
    a.student_id.toString().includes(searchTerm) ||
    a.course_id.toString().includes(searchTerm) ||
    a.percentage.toString().includes(searchTerm)
  );

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

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          label="Search Attendance"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          margin="normal"
        />
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
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>
                        {editId === a.id ? (
                          <TextField value={editStudentId} onChange={e => setEditStudentId(e.target.value)} />
                        ) : (
                          a.student_id
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === a.id ? (
                          <TextField value={editCourseId} onChange={e => setEditCourseId(e.target.value)} />
                        ) : (
                          a.course_id
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === a.id ? (
                          <TextField value={editPercentage} onChange={e => setEditPercentage(e.target.value)} />
                        ) : (
                          a.percentage
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === a.id ? (
                          <Button variant="contained" onClick={handleUpdate}>Save</Button>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => handleEdit(a)}
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(a.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
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
