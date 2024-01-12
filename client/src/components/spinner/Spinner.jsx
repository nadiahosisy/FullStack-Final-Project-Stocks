import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={50} style={{ color: "rgb(30, 39, 89" }} />{" "}
    </div>
  );
};

export default Spinner;
