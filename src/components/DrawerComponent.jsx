// DrawerComponent.jsx
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

const DrawerComponent = ({ 
  menuItems, 
  onNavigate, 
  drawerWidth, 
  mobileOpen, 
  onDrawerToggle,
  isMobile 
}) => {
  const location = useLocation();

  const drawerContent = (
    <>
      <Box sx={{ p: 2, height: 64, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5">
          Sticky Notes
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            onClick={() => onNavigate(item.path)}
            key={item.text}
            sx={{
              backgroundColor: location.pathname === item.path ? "#f4f4f4" : null,
              '&:hover': {
                backgroundColor: location.pathname === item.path ? "#f4f4f4" : null,
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      
      {/* Desktop drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default DrawerComponent;