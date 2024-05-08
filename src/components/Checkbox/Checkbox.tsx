// components/BasicCheckbox.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import { Checkbox, CheckboxProps } from "@mui/material";
import { FC, useContext } from "react";

// interface BasicCheckboxProps extends CheckboxProps {
//   label?: string;  // Optional label
// }

const BasicCheckbox: FC<CheckboxProps> = ({ checked, onChange, ...props }) => {
  const { ThemeColor } = useContext(UseContextHook);
  return (
    <Checkbox
      sx={{
        padding: 0,
        margin: 0,
        color: ThemeColor.primaryColor,
        "&.Mui-checked": { color: ThemeColor.secondaryColor },
      }}
      size="small"
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};

export default BasicCheckbox;
