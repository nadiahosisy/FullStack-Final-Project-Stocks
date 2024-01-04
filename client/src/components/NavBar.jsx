import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../context/AuthProvider";

export const NavBar = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const pages = ["Home", "About", "My Stocks"];
  const pagePaths = ["/", "/about", "/mystocks"];

  return (
    <AppBar
      style={{ background: "rgba(40, 45, 71, 0.5)", fontFamily: "Normal" }}
      position="static"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <ShowChartRoundedIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          Stock Prediction App
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {userData && (
            <Typography
              sx={{
                display: "flex",
                flexGrow: 0,
                fontSize: "22px",
                textAlign: "center",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                color: "yellow",
                fontFamily: "Normal",
              }}
            >
              Hello, {capitalizeFirstLetter(userData.name)}
            </Typography>
          )}
          {pages.map((page, index) => (
            <Button
              key={page}
              color="inherit"
              component={NavLink}
              to={pagePaths[index]}
            >
              {page}
            </Button>
          ))}

          <Button onClick={handleLogout} size="large" style={{ color: "red" }}>
            {userData ? "Logout" : "Login"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
