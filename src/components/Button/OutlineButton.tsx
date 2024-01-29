// components/Button.tsx
import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface OutlinedButtonProps extends ButtonProps {
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{ fontSize: "12px", padding: "4px 8px", whiteSpace: "nowrap" }}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
