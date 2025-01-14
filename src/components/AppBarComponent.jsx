// AppBarComponent.jsx
import { IconButton, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { AccountCircle, Menu } from "@mui/icons-material";
import { format } from "date-fns";

const AppBarComponent = ({
  onProfileClick,
  onMenuClick,
  isMobile,
  drawerWidth,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div" noWrap>
            Today is {format(new Date(), "do MMMM y")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              md: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography variant="body1" noWrap>
            Pratik
          </Typography>
          <IconButton color="inherit" onClick={onProfileClick}>
            <AccountCircle sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
