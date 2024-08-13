import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUser, removeAuth } from "../../../services/auth";

const LinkButton = styled(Button)(({ theme, active }) => {
  return {
    marginRight: 9,
    borderRadius: 0,
    ["&.active"]: {
      borderBottom: "2px solid #fff",
    },
  };
});

const AppHeader = () => {
  const navigate = useNavigate();
  const username = getUser();
  const logout = () => {
    removeAuth();
    navigate("/login");
  };
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
          <Divider
            orientation="vertical"
            sx={{
              position: "relative",
              height: "20px",
              ml: 2,
              mr: 2,
              backgroundColor: alpha("#fff", 0.5),
            }}
          />
          <LinkButton
            active
            component={NavLink}
            activeClassName={"active"}
            to={"/"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography color={"inherit"} component={"div"}>
              Invoices
            </Typography>
          </LinkButton>
          <LinkButton
            component={NavLink}
            activeClassName={"active"}
            to={"/dashboard"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography color={"inherit"} component={"div"}>
              DashBoard
            </Typography>
          </LinkButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography mr={2}>{username}</Typography>
          <Tooltip title="Logout">
            <IconButton onClick={logout}>
              <PowerSettingsNewIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
