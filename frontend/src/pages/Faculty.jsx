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

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // edit states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    const res = await api.get("/api/faculty/");
    setFaculty(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    await api.post("/api/faculty/", { name, department });
    fetchFaculty();
    setName("");
    setDepartment("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/faculty/${id}/`);
      fetchFaculty();
    } catch (err) {
      console.error("Error deleting faculty:", err);
    }
  };

  const handleEdit = (f) => {
    setEditId(f.id);
    setEditName(f.name);
    setEditDepartment(f.department);
  };

  const handleUpdate = async () => {
    await api.put(`/api/faculty/${editId}/`, {
      name: editName,
      department: editDepartment
    });
    fetchFaculty();
    setEditId(null);
    setEditName("");
    setEditDepartment("");
  };

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Faculty
            </Typography>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Faculty
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          label="Search Faculty"
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
              Faculty Records
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.id}</TableCell>
                      <TableCell>
                        {editId === f.id ? (
                          <TextField value={editName} onChange={e => setEditName(e.target.value)} />
                        ) : (
                          f.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === f.id ? (
                          <TextField value={editDepartment} onChange={e => setEditDepartment(e.target.value)} />
                        ) : (
                          f.department
                        )}
                      </TableCell>
                      <TableCell>
                        {editId === f.id ? (
                          <Button variant="contained" onClick={handleUpdate}>Save</Button>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => handleEdit(f)}
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(f.id)}
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
                    <TableCell colSpan={4}>No faculty found</TableCell>
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

export default Faculty;
