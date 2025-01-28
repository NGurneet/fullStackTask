import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

interface MenuItemProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
      <Button
        sx={{
          color: "#ffffff", // White text for menu items
          fontSize: "16px",
          fontWeight: "500",
          position: "relative",
          "&:hover": {
            color: "#ffcc00", // Highlight color on hover
          },
        }}
      >
        {label}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            width: "100%",
            backgroundColor: "#ffcc00", // Highlight underline
            transformOrigin: "left",
          }}
        />
      </Button>
    </motion.div>
  );
};

export default MenuItem;
