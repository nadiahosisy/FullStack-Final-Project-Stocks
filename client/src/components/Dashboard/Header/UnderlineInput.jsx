import Input from "@mui/joy/Input";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function UnderlineInput({ onInputChange, onButtonClick }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };
  const handleButtonClick = () => {
    onButtonClick(inputValue);
  };

  return (
    <Stack spacing={2} direction={"row"} alignItems="center">
      <Input
        placeholder="Type Stock Name Here..."
        variant="soft"
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          "--Input-radius": "0px",
          borderBottom: "2px solid",
          borderColor: "neutral.outlinedBorder",
          background: "rgba(40, 45, 71, 0.5)",
          color: "#ffff",
          "&:hover": {
            borderColor: "neutral.outlinedHoverBorder",
          },
          "&::before": {
            border: "1px solid var(--Input-focusedHighlight)",
            transform: "scaleX(0)",
            left: 0,
            right: 0,
            bottom: "-2px",
            top: "unset",
            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
            borderRadius: 0,
          },
          "&:focus-within::before": {
            transform: "scaleX(1)",
            borderColor: "rgb(103, 58, 183)",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        style={{ backgroundColor: "rgb(103, 58, 183)" }}
      >
        Get Data
      </Button>
    </Stack>
  );
}
