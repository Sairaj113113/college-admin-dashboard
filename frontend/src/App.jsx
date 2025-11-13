import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./components/Sidebar";

// Import all pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Fee from "./pages/Fee";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Feedback from "./pages/Feedback";

export default function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/fee" element={<Fee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/results" element={<Results />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
