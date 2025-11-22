import React, { useState } from "react";

function RiskChecker() {
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState(null);

  const checkRisk = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance: Number(attendance), marks: Number(marks) }),
      });
      const data = await response.json();
      setResult(data.status);
    } catch (error) {
      setResult("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>Student Risk Prediction</h3>
      <input
        type="number"
        placeholder="Attendance %"
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
      />
      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />
      <button onClick={checkRisk}>Check Risk</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default RiskChecker;
