import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Button from "@mui/material/Button";
import Spinner from "../../Spinner/Spinner"; // Import your Spinner component

export default function UnderlineInput({ onInputChange, onButtonClick }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true); // Start loading
    try {
      await onButtonClick(inputValue); // Assuming onButtonClick is a function that returns a Promise
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
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
          background: "rgba(40, 45, 71, 0.1)",
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
            borderButtom: "#6c63ff",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        style={{ backgroundColor: "#6c63ff" }}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Get Data"}{" "}
      </Button>
    </Stack>
  );
}
