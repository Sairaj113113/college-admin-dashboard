import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff"
        }
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/students">
          <ListItemIcon>
            <SchoolIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>

        <ListItem button component={Link} to="/courses">
          <ListItemIcon>
            <MenuBookIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>

        <ListItem button component={Link} to="/faculty">
          <ListItemIcon>
            <PeopleIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Faculty" />
        </ListItem>

        <ListItem button component={Link} to="/fee">
          <ListItemIcon>
            <PaymentsIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Fee" />
        </ListItem>

        <ListItem button component={Link} to="/attendance">
          <ListItemIcon>
            <EventIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>

        <ListItem button component={Link} to="/results">
          <ListItemIcon>
            <AssignmentIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Results" />
        </ListItem>

        <ListItem button component={Link} to="/feedback">
          <ListItemIcon>
            <FeedbackIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Drawer>
  );
}
