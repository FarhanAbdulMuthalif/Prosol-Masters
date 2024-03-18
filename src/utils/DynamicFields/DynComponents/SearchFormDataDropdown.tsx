import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";

interface DropdownProps {
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[];
  name: string;
}

const SearchFormDataDropdown: FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  name,
}) => {
  const menuItemStyle = {
    fontSize: "10px",
    color: "#5E5873",
    fontWeight: "600",
    // display: "flex",
    // justifyContent: "flex-end",
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "250px",
      },
    },
  };
  const SelectStyle = {
    fontSize: "10px",
    color: "brown",
    height: "2.2rem",
  };

  const [SearchText, setSearchText] = useState("");
  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = options.filter((option: string) =>
    containsText(option, SearchText)
  );
  return (
    <Select
      name={name}
      fullWidth
      value={value ? value : ""}
      sx={SelectStyle}
      placeholder={label}
      displayEmpty
      onChange={onChange}
      MenuProps={MenuProps}
      renderValue={(value) => {
        return value ? value : label;
      }}
      onClose={() => setSearchText("")}
    >
      <ListSubheader>
        <OutlineTextField
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ paddingLeft: "5px" }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Escape") {
              // Prevents autoselecting item while typing (default Select behaviour)
              e.stopPropagation();
            }
          }}
        />
      </ListSubheader>
      <MenuItem sx={menuItemStyle} value="" disabled>
        {label}
      </MenuItem>

      {displayedOptions.map((option) => (
        <MenuItem sx={menuItemStyle} key={option} value={option}>
          {capitalizeFunc(option)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SearchFormDataDropdown;
