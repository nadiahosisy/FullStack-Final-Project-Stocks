import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../context/AuthProvider";

export const NavBar = () => {
  const { userData, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const pages = ["Home", "About", "My Dashboard"];
  const pagePaths = ["/", "/About", "/myDashboard"];

  return (
    <AppBar
      style={{ background: "rgba(10, 45, 71, 0.3)", fontFamily: "Normal" }}
      position="static"
    >
      <Toolbar style={{ minHeight: "60px" }}>
        {/* Show the menu icon only on xs (extra-small) screens */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
          onClick={handleMobileMenuToggle}
        ></IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "block" }, // Only display on md screens and larger
            fontFamily: "Normal",
            ml: { xs: 0, md: 2 },
          }}
        >
          Stock Prediction App
        </Typography>
        <div
          className="nav-links"
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }} // Only display on md screens and larger
        >
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
        </div>
        {userData && (
          <>
            <Avatar
              alt={capitalizeFirstLetter(userData.name)}
              src={userData.imageUrl}
              sx={{
                width: 40,
                height: 40,

                cursor: "pointer",
                display: { xs: "none", md: "flex" }, // Show only in desktop view
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
                  backgroundColor: "#fff7f6",
                  fontFamily: "Normal",
                }}
              >
                Hello, {capitalizeFirstLetter(userData.name)} 👋
              </Typography>
            </Popover>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
