import { UseContextHook } from "@/Provides/UseContextHook";
import Switch from "@mui/material/Switch";
import { useContext } from "react";

const ReusableSwitch = ({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) => {
  const ContextDataHub = useContext(UseContextHook);

  const { ThemeColor } = ContextDataHub;
  return (
    <Switch
      checked={checked}
      color="primary"
      size="small"
      onChange={onChange}
      name={name ? name : ""}
      sx={{
        "& .Mui-checked  .MuiSwitch-thumb": {
          color: ThemeColor.primaryColor, // Change to your desired color for the checked state
        },
        "& > .Mui-checked + .MuiSwitch-track": {
          backgroundColor: `${ThemeColor.secondaryColor} !important`, // Change to your desired color for the track
        },
      }}
    />
  );
};

export default ReusableSwitch;
