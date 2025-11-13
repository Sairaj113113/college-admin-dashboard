import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";   // Sidebar + AppBar
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import Attendance from "./pages/Attendance";
import Feedback from "./pages/Feedback";
import Faculty from "./pages/Faculty";
import Fee from "./pages/Fee";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes wrapped in Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Students /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/results" element={<Layout><Results /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        <Route path="/faculty" element={<Layout><Faculty /></Layout>} />
        <Route path="/fee" element={<Layout><Fee /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
