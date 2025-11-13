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
                {faculty.length > 0 ? (
                  faculty.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.id}</TableCell>
                      <TableCell>{f.name}</TableCell>
                      <TableCell>{f.department}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(f.id)}
                        >
                          Delete
                        </Button>
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
