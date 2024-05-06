import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const NoBorderTextfield: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      {...props}
      autoComplete="off"
      sx={{
        "& .MuiInputBase-input": { height: 2, padding: 1 },
        "& fieldset": { border: "none" },
      }}
      //   InputLabelProps={{
      //     sx: {
      //       fontSize: "8px",
      //     },
      //   }}
    />
  );
};

export default NoBorderTextfield;
