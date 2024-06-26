// components/TextField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

// interface OutlineTextFieldProps extends TextFieldProps {
//   // You can add any additional custom props here
//   // Example: customProp?: string;
// }

const OutlineTextField: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      {...props}
      autoComplete="off"
      sx={{ "& .MuiInputBase-input": { height: 8, padding: 1 } }}
    />
  );
};

export default OutlineTextField;
