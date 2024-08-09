// src/components/DrawerComponent.js
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const DrawerComponent = ({ menuItems, onNavigate }) => {
  const location = useLocation();

  const customStyle = {
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
  };

  return (
    <Drawer sx={customStyle.drawer} variant="permanent" anchor="left">
      <Box>
        <Typography variant="h5" sx={{ padding: "12px" }}>
          Sticky Notes
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            onClick={() => onNavigate(item.path)}
            key={item.text}
            sx={location.pathname === item.path ? customStyle.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
