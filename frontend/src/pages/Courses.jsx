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
  const [searchTerm, setSearchTerm] = useState("");

  // edit states
  const [editId, setEditId] = useState(null);
  const [editCode, setEditCode] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editFaculty, setEditFaculty] = useState("");

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

  const handleEdit = (course) => {
    setEditId(course.id);
    setEditCode(course.code);
    setEditTitle(course.title);
    setEditFaculty(course.faculty);
  };

  const handleUpdate = async () => {
    await api.put(`/api/courses/${editId}/`, {
      code: editCode,
      title: editTitle,
      faculty: editFaculty
    });
    fetchCourses();
    setEditId(null);
    setEditCode("");
    setEditTitle("");
    setEditFaculty("");
  };

  const filteredCourses = courses.filter(c =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          label="Search Courses"
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
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.id}</TableCell>
                      <TableCell>
                        {editId === c.id ? (
                          <TextField value={editCode} onChange={e => setEditCode(e.target.value)} />
                        ) : (
                          c.code
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === c.id ? (
                          <TextField value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                        ) : (
                          c.title
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === c.id ? (
                          <TextField value={editFaculty} onChange={e => setEditFaculty(e.target.value)} />
                        ) : (
                          c.faculty
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === c.id ? (
                          <Button variant="contained" onClick={handleUpdate}>Save</Button>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => handleEdit(c)}
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(c.id)}
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
