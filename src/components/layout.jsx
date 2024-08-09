// src/components/Layout.js
import React from "react";
import { Box } from "@mui/material";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import { useNavigate } from "react-router-dom";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";

const drawerWidth = 240;
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

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarComponent onProfileClick={() => console.log("Profile clicked")} />

      <DrawerComponent menuItems={menuItems} onNavigate={navigate} />

      <Box
        sx={{
          background: "#f9f9f9",
          width: `calc(100% - ${drawerWidth}px)`,
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
