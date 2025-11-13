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

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const res = await api.get("/api/feedback/");
    setFeedback(Array.isArray(res.data) ? res.data : []);
  };

  const handleAdd = async () => {
    await api.post("/api/feedback/", { user, message });
    fetchFeedback();
    setUser("");
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/feedback/${id}/`);
      fetchFeedback();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Form Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Feedback
            </Typography>
            <TextField
              label="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              style={{ marginTop: 10 }}
            >
              Add Feedback
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Table Card */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Feedback Records
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedback.length > 0 ? (
                  feedback.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.id}</TableCell>
                      <TableCell>{f.user}</TableCell>
                      <TableCell>{f.message}</TableCell>
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
                    <TableCell colSpan={4}>No feedback found</TableCell>
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

export default Feedback;
