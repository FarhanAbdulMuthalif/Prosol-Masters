// components/Button.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import { Button, ButtonProps } from "@mui/material";
import React, { useContext } from "react";

interface OutlinedButtonProps extends ButtonProps {
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  ...props
}) => {
  const ContextDataHub = useContext(UseContextHook);

  const { ThemeColor } = ContextDataHub;
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        fontSize: "12px",
        padding: "4px 8px",
        whiteSpace: "nowrap",
        borderColor: ThemeColor.primaryColor,
        color: ThemeColor.primaryColor,
        "&:hover": {
          borderColor: ThemeColor.secondaryColor,
          color: ThemeColor.secondaryColor,
          backgroundColor: "transparent",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
