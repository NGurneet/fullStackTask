// src/components/FormField.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { motion } from "framer-motion"; // Import motion

interface FormFieldProps {
  name: string;
  label: string;
  control: any;
  rules: any;
  type?: string;
  error: boolean;
  helperText: string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  control,
  rules,
  type = "text",
  error,
  helperText,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state (faded and slightly below)
      animate={{ opacity: 1, y: 0 }}   // Final state (fully visible and in place)
      transition={{ duration: 0.4 }}    // Duration of the animation
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            type={type}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </motion.div>
  );
};

export default FormField;
