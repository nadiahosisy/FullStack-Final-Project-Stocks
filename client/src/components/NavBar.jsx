import { useState } from "react";
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

export const NavBar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => setAnchorNav(event.currentTarget);
  const closeMenu = () => setAnchorNav(null);

  const pages = ["Home", "About", "My Stocks", "Login"];
  const pagePaths = ["/", "/about", "/mystocks", "/login"];

  return (
    <AppBar style={{ backgroundColor: "gray" }} position="static">
      <Toolbar>
        <IconButton
          size="small"
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
              key={index}
              color="inherit"
              component={NavLink}
              to={pagePaths[index]}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#4a4a4a" : "inherit",
                color: isActive ? "#ffffff" : "inherit",
              })}
            >
              {page}
            </Button>
          ))}
        </Stack>
        <Stack sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
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
                key={index}
                onClick={closeMenu}
                component={NavLink}
                to={pagePaths[index]}
              >
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <ShowChartRoundedIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
          Stock Prediction App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
