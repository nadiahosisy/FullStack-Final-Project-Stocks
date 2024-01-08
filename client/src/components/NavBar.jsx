import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Avatar,
  Popover,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../context/AuthProvider";

export const NavBar = () => {
  const { userData, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const pages = ["Home", "About", "My Stocks"];
  const pagePaths = ["/", "/About", "/mystocks"];

  return (
    <AppBar
      style={{ background: "rgba(10, 45, 71, 0.3)", fontFamily: "Normal" }}
      position="static"
    >
      <Toolbar style={{ minHeight: "30px" }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="logo"
          sx={{
            display: { xs: "none", md: "flex" },
            color: "hsla(261, 51%, 50%, 1)",
          }}
        >
          <ShowChartRoundedIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex", fontFamily: "Normal" },
          }}
        >
          Stock Prediction App
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
          alignItems="center"
        >
          {userData && (
            <>
              <Avatar
                alt={capitalizeFirstLetter(userData.name)}
                src={userData.imageUrl}
                sx={{
                  width: 40,
                  height: 40,
                  marginRight: 1,
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    color: "black",
                    fontFamily: "Bold",
                    backgroundColor: "#fff7f6",
                    fontFamily: "Normal",
                  }}
                >
                  Hello, {capitalizeFirstLetter(userData.name)} 👋
                </Typography>
              </Popover>
            </>
          )}
          {pages.map((page, index) => (
            <Button
              key={page}
              color="inherit"
              fontFamily="Normal"
              component={NavLink}
              to={pagePaths[index]}
              style={{ fontFamily: "Normal" }}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={handleLogout}
            style={{ color: "red", fontFamily: "Normal" }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
