// components/Button.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import { Button, ButtonProps } from "@mui/material";
import React, { useContext } from "react";

interface FillButtonProps extends ButtonProps {
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const FillButton: React.FC<FillButtonProps> = ({ children, ...props }) => {
  const ContextDataHub = useContext(UseContextHook);

  const { ThemeColor } = ContextDataHub;
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        fontSize: "12px",
        padding: "3px 16px",
        whiteSpace: "nowrap",
        backgroundColor: ThemeColor.primaryColor,

        "&:hover": {
          backgroundColor: ThemeColor.secondaryColor, // Set the hover color to the same as the background color
          color:
            ThemeColor.name === "LotusTheme"
              ? ThemeColor.primaryColor
              : "white",
          // or use the following line to clear the hover color
          // backgroundColor: "transparent",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default FillButton;
