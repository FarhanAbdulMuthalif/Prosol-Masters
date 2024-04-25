// components/TextField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

// interface OutlineTextFieldProps extends TextFieldProps {
//   // You can add any additional custom props here
//   // Example: customProp?: string;
// }

const FullSizeOutlineTextField: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField size="small" variant="outlined" {...props} autoComplete="off" />
  );
};

export default FullSizeOutlineTextField;
