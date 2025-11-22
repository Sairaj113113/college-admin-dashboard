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

function Results() {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [marks, setMarks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // edit states
  const [editId, setEditId] = useState(null);
  const [editStudentId, setEditStudentId] = useState("");
  const [editCourseId, setEditCourseId] = useState("");
  const [editMarks, setEditMarks] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get("/api/results/");
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/api/results/", {
        student_id: studentId,
        course_id: courseId,
        marks: parseInt(marks)
      });
      fetchResults();
      setStudentId("");
      setCourseId("");
      setMarks("");
    } catch (err) {
      console.error("Error adding result:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/results/${id}/`);
      fetchResults();
    } catch (err) {
      console.error("Error deleting result:", err);
    }
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setEditStudentId(r.student_id);
    setEditCourseId(r.course_id);
    setEditMarks(r.marks);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/results/${editId}/`, {
        student_id: editStudentId,
        course_id: editCourseId,
        marks: parseInt(editMarks)
      });
      fetchResults();
      setEditId(null);
      setEditStudentId("");
      setEditCourseId("");
      setEditMarks("");
    } catch (err) {
      console.error("Error updating result:", err);
    }
  };

  const filteredResults = results.filter(r =>
    r.student_id.toString().includes(searchTerm) ||
    r.course_id.toString().includes(searchTerm) ||
    r.marks.toString().includes(searchTerm)
  );

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Result
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
              label="Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Result
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          label="Search Results"
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
              Results Records
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Course ID</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>
                        {editId === r.id ? (
                          <TextField value={editStudentId} onChange={e => setEditStudentId(e.target.value)} />
                        ) : (
                          r.student_id
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === r.id ? (
                          <TextField value={editCourseId} onChange={e => setEditCourseId(e.target.value)} />
                        ) : (
                          r.course_id
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === r.id ? (
                          <TextField value={editMarks} onChange={e => setEditMarks(e.target.value)} />
                        ) : (
                          r.marks
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === r.id ? (
                          <Button variant="contained" onClick={handleUpdate}>Save</Button>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => handleEdit(r)}
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(r.id)}
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
                    <TableCell colSpan={5}>No results found</TableCell>
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

export default Results;
