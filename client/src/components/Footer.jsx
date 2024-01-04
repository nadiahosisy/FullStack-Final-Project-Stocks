import React from "react";
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

const Footer = () => {
  return (
    <AppBar
      className="footer-app-bar"
      style={{ background: "rgba(40, 45, 71, 0.5)", fontFamily: "Normal" }}
      position="static"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Stock World. All rights reserved.
        </p>
      </div>

      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default Footer;
