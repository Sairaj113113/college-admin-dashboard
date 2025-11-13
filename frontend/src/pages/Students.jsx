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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Students Module
      </Typography>

      {/* Form to add student */}
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

      {/* Students Table */}
      <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
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
              {students.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </Button>
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
