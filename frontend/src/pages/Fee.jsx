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

function Fee() {
  const [fees, setFees] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const res = await api.get("/api/fees/");
    setFees(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    await api.post("/api/fees/", {
      student_id: studentId,
      amount: parseInt(amount),
      status
    });
    fetchFees();
    setStudentId("");
    setAmount("");
    setStatus("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/fees/${id}/`);
      fetchFees();
    } catch (err) {
      console.error("Error deleting fee:", err);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Fee
            </Typography>
            <TextField
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Fee
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Table Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Fee Records
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.length > 0 ? (
                  fees.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.id}</TableCell>
                      <TableCell>{f.student_id}</TableCell>
                      <TableCell>{f.amount}</TableCell>
                      <TableCell>{f.status}</TableCell>
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
                    <TableCell colSpan={5}>No fees found</TableCell>
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

export default Fee;
