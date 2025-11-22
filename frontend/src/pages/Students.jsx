import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box
} from "@mui/material";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDepartment, setEditDepartment] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/api/students/");
    setStudents(res.data);
  };

  const handleAdd = async () => {
    await api.post("/api/students/", { name, email, department });
    fetchStudents();
    setName("");
    setEmail("");
    setDepartment("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/students/${id}/`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setEditName(student.name);
    setEditEmail(student.email);
    setEditDepartment(student.department);
  };

  const handleUpdate = async () => {
    await api.put(`/api/students/${editId}/`, {
      name: editName,
      email: editEmail,
      department: editDepartment
    });
    fetchStudents();
    setEditId(null);
    setEditName("");
    setEditEmail("");
    setEditDepartment("");
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Students Module
      </Typography>

      {/* Add Student Form */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add Student
        </Button>
      </Box>

      {/* Search Bar */}
      <TextField
        label="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Students Table */}
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>
                    {editId === s.id ? (
                      <TextField value={editName} onChange={e => setEditName(e.target.value)} />
                    ) : (
                      s.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editId === s.id ? (
                      <TextField value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                    ) : (
                      s.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editId === s.id ? (
                      <TextField value={editDepartment} onChange={e => setEditDepartment(e.target.value)} />
                    ) : (
                      s.department
                    )}
                  </TableCell>
                  <TableCell>
                    {editId === s.id ? (
                      <Button variant="contained" onClick={handleUpdate}>Save</Button>
                    ) : (
                      <>
                        <Button variant="outlined" onClick={() => handleEdit(s)} sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(s.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
