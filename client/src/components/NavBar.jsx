import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../context/AuthProvider";

export const NavBar = () => {
  const { userData } = useAuth();
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => setAnchorNav(event.currentTarget);
  const closeMenu = () => setAnchorNav(null);

  const pages = userData
    ? ["Home", "About", "My Stocks"]
    : ["Home", "About", "My Stocks", "Login"];
  const pagePaths = userData
    ? ["/", "/about", "/mystocks"]
    : ["/", "/about", "/mystocks", "/login"];

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
          {pages.map((page, index) => (
            <Button
              key={page}
              color="inherit"
              component={NavLink}
              to={pagePaths[index]}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(40, 45, 71, 0.5)" : "inherit",
                color: isActive ? "#ffffff" : "inherit",
              })}
            >
              {page}
            </Button>
          ))}
          {userData && (
            <Typography
              sx={{
                flexGrow: 0,
                textAlign: "center",
                alignItems: "center",
                color: "yellow",
              }}
            >
              Hello, {userData.name}
            </Typography>
          )}
        </Stack>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={openMenu}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorNav}
          open={Boolean(anchorNav)}
          onClose={closeMenu}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          {pages.map((page, index) => (
            <MenuItem
              key={page}
              onClick={closeMenu}
              component={NavLink}
              to={pagePaths[index]}
            >
              {page}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
