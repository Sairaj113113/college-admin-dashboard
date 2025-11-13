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
                {results.length > 0 ? (
                  results.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.student_id}</TableCell>
                      <TableCell>{r.course_id}</TableCell>
                      <TableCell>{r.marks}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(r.id)}
                        >
                          Delete
                        </Button>
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
