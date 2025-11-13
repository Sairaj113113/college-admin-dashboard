import { useState, useEffect } from "react";
import {
  Typography,
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

export default function Risk() {
  const [riskData, setRiskData] = useState([]);

  useEffect(() => {
    api.get("/api/analysis/performance").then(res => {
      setRiskData(res.data);
    });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Performance Risk
      </Typography>

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Average Attendance %</TableCell>
                <TableCell>Average Marks</TableCell>
                <TableCell>Risk Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riskData.map(r => (
                <TableRow key={r.student_id}>
                  <TableCell>{r.student_id}</TableCell>
                  <TableCell>{r.attendance.toFixed(1)}%</TableCell>
                  <TableCell>{r.marks.toFixed(1)}</TableCell>
                  <TableCell
                    style={{
                      color:
                        r.risk === "High"
                          ? "red"
                          : r.risk === "Medium"
                          ? "orange"
                          : "green",
                      fontWeight: "bold"
                    }}
                  >
                    {r.risk}
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
