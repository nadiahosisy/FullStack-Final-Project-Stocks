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
      style={{
        background: "rgba(10, 45, 71, 0.3)",
        fontFamily: "Normal",
        height: "45px",
      }}
      position="static"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <p style={{ margin: "10px" }}>
          &copy; {new Date().getFullYear()} Stock World. All rights reserved.
        </p>
      </div>
    </AppBar>
  );
};

export default Footer;
