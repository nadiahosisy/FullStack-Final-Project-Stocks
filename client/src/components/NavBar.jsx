import { useState } from "react";

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
const pages = ["Home", "About", "My Stocks", "Login"];

// eslint-disable-next-line no-undef

export const NavBar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };
  return (
    <AppBar
      style={{ backgroundColor: "gray" }}
      position="static"
      enableColorOnDark
    >
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
            <Button key={index} color="inherit">
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
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            {pages.map((page, index) => (
              <MenuItem key={index}>{page}</MenuItem>
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
