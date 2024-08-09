import { IconButton, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { format } from "date-fns";

const AppBarComponent = ({ onProfileClick }) => {
  return (
    <AppBar
      sx={{
        width: `calc(100% - ${240}px)`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            Today is {format(new Date(), "do MMMM Y")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Pratik</Typography>
          <IconButton color="inherit" onClick={onProfileClick}>
            <AccountCircle sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
