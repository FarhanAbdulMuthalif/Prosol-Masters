// components/TextField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import "./TextareaOutline.scss";

// interface OutlineTextFieldProps extends TextFieldProps {
//   // You can add any additional custom props here
//   // Example: customProp?: string;
// }

const TextareaOutline: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      sx={{ color: "brown" }}
      multiline
      size="small"
      variant="outlined"
      {...props}
    />
  );
};

export default TextareaOutline;
