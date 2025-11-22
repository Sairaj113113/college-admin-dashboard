import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import api from "../services/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [feeTotal, setFeeTotal] = useState(0);

  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [riskResult, setRiskResult] = useState(null);

  useEffect(() => {
    api.get("/api/students/count")
      .then(res => setStudentCount(res.data.count))
      .catch(err => console.error(err));

    api.get("/api/courses/count")
      .then(res => setCourseCount(res.data.count))
      .catch(err => console.error(err));

    api.get("/api/faculty/count")
      .then(res => setFacultyCount(res.data.count))
      .catch(err => console.error(err));

    api.get("/api/fees/total")
      .then(res => setFeeTotal(res.data.total))
      .catch(err => console.error(err));
  }, []);

  // ✅ Normalize feeTotal for chart display
  const summaryData = [
    { name: "Students", value: studentCount },
    { name: "Courses", value: courseCount },
    { name: "Faculty", value: facultyCount },
    { name: "Fees", value: Math.round(feeTotal / 100000) }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const checkRisk = async () => {
    try {
      const response = await api.post("/api/predict", {
        attendance: Number(attendance),
        marks: Number(marks),
      });
      setRiskResult(response.data.status);
    } catch (error) {
      setRiskResult("Error connecting to backend");
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Count Cards */}
      {[
        { label: "Students", value: studentCount },
        { label: "Courses", value: courseCount },
        { label: "Faculty", value: facultyCount },
        { label: "Fees (₹)", value: feeTotal.toLocaleString() }
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Pie Chart Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Dashboard Summary (Pie Chart)</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={400} height={300}>
                <Pie
                  data={summaryData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <Typography variant="caption" align="center">
              * Fees scaled down for visualization
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Bar Chart Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Dashboard Summary (Bar Chart)</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BarChart width={400} height={300} data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </div>
            <Typography variant="caption" align="center">
              * Fees scaled down for visualization
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Student Risk Prediction Widget */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Student Risk Prediction</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Attendance %"
                  type="number"
                  fullWidth
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Marks"
                  type="number"
                  fullWidth
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" color="primary" onClick={checkRisk}>
                  Check Risk
                </Button>
              </Grid>
            </Grid>
            {riskResult && (
              <Typography variant="h6" style={{ marginTop: 20 }}>
                Result: {riskResult}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
