import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box } from "@mui/material";
import { School, Book, Assessment, People, Feedback, MonetizationOn, Event } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            College Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/students">
            <ListItemIcon><School /></ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button component={Link} to="/courses">
            <ListItemIcon><Book /></ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button component={Link} to="/results">
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Results" />
          </ListItem>
          <ListItem button component={Link} to="/attendance">
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem button component={Link} to="/feedback">
            <ListItemIcon><Feedback /></ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button component={Link} to="/faculty">
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Faculty" />
          </ListItem>
          <ListItem button component={Link} to="/fee">
            <ListItemIcon><MonetizationOn /></ListItemIcon>
            <ListItemText primary="Fee" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
