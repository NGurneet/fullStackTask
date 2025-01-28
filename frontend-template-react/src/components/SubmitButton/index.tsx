// src/components/SubmitButton.tsx
import React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => (
  <Button
    variant="contained"
    fullWidth
    sx={{
      marginTop: 2,
      backgroundColor: "#ffcc00", // Primary color from theme
      "&:hover": { backgroundColor: "#ff9800" },
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default SubmitButton;
