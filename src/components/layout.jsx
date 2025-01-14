// Layout.jsx
import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import { useNavigate } from "react-router-dom";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";

const menuItems = [
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBarComponent 
        onProfileClick={() => console.log("Profile clicked")}
        onMenuClick={handleDrawerToggle}
        isMobile={isMobile}
        drawerWidth={drawerWidth}
      />

      {/* Drawer */}
      <DrawerComponent
        menuItems={menuItems}
        onNavigate={(path) => {
          navigate(path);
          if (isMobile) setMobileOpen(false);
        }}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: "#f9f9f9",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          padding: "20px",
          marginTop: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;