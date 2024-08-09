import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  Menu as MenuIcon,
  AccountCircle,
} from "@mui/icons-material";
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const menuItem = [
  {
    text: "My Notes",
    path: "/",
    icon: <SubjectOutlined color="secondary" />,
  },
  {
    text: "Create Note",
    path: "/create",
    icon: <AddCircleOutlineOutlined color="secondary" />,
  },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const customStyle = {
    page: {
      background: "#f9f9f9",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "20px",
      marginTop: "64px", // Adjust for the AppBar height
    },
    drawer: {
      width: drawerWidth,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    },
    active: {
      background: "#f4f4f4",
    },
    appBar: {
      zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
      width: `calc(100% - ${drawerWidth}px)`, // Adjusted width
      backgroundColor: "#ffffff", // Set AppBar color to white
      color: "#000000", // Set text color to black for contrast
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between", // Space out title and action icons
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={customStyle.appBar} elevation={0}>
        <Toolbar sx={customStyle.toolbar}>
          {/* Left side of the AppBar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              Today is {format(new Date(), "do MMMM Y")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">Pratik</Typography>
            <IconButton
              color="inherit"
              onClick={() => console.log("Profile clicked")}
            >
              <AccountCircle sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer sx={customStyle.drawer} variant="permanent" anchor="left">
        <Box>
          <Typography variant="h5" sx={{ padding: "12px" }}>
            Sticky Notes
          </Typography>
        </Box>
        <List>
          {menuItem.map((item) => (
            <ListItemButton
              onClick={() => navigate(item.path)}
              key={item.text}
              sx={location.pathname === item.path ? customStyle.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box sx={customStyle.page}>{children}</Box>
    </Box>
  );
};

export default Layout;
