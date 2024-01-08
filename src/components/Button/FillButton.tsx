// components/Button.tsx
import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface FillButtonProps extends ButtonProps {
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const FillButton: React.FC<FillButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{ fontSize: "12px", padding: "4px 8px" }}
    >
      {children}
    </Button>
  );
};

export default FillButton;
