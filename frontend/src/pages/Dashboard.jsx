import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
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

    api.get("/api/fee/total")
      .then(res => setFeeTotal(res.data.total))
      .catch(err => console.error(err));
  }, []);

  const summaryData = [
    { name: "Students", value: studentCount },
    { name: "Courses", value: courseCount },
    { name: "Faculty", value: facultyCount },
    { name: "Fees", value: feeTotal }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      {/* Count Cards */}
      {[
        { label: "Students", value: studentCount },
        { label: "Courses", value: courseCount },
        { label: "Faculty", value: facultyCount }
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
