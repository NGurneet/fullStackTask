// src/components/InputField.tsx
import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  rules: any;
  error: boolean;
  helperText: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  label,
  type = "text",
  rules,
  error,
  helperText,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        variant="outlined"
        fullWidth
        margin="normal"
        error={error}
        helperText={helperText}
      />
    )}
  />
);

export default InputField;
