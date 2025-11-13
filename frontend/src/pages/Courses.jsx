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

function Courses() {
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/api/courses/");
    setCourses(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    await api.post("/api/courses/", { code, title, faculty });
    fetchCourses();
    setCode("");
    setTitle("");
    setFaculty("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/courses/${id}/`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Course
            </Typography>
            <TextField
              label="Course Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Course
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Table Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Courses List
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Faculty</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.length > 0 ? (
                  courses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.id}</TableCell>
                      <TableCell>{c.code}</TableCell>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>{c.faculty}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No courses found</TableCell>
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

export default Courses;
