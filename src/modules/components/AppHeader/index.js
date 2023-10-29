import { AppBar, Avatar, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            to={"/"}
            component={Link}
            src="https://sekaiholidays.in/wp-content/uploads/2022/11/cropped-top-logo-32x32.png"
            width={40}
          />
          <Typography variant="h6" noWrap component="a" sx={{ ml: 1 }}>
            Invoice Generator
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
