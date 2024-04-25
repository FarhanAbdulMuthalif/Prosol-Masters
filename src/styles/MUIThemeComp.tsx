import { createTheme } from "@mui/material/styles";
import { SingleThemeObjProps } from "../../TypesStore";
import { PrimaryTextColor } from "./colorsCode";

const MUIThemeComp = (selectedFont: string, ThemeColor: SingleThemeObjProps) =>
  createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          // root: {
          //   fontSize: "12px",
          //   padding: 0,
          //   "& input::placeholder": {
          //     color: "brown",
          //     opacity: ".7",
          //   },
          // },
          root: {
            fontSize: "12px",
            "&.MuiOutlinedInput-root": {
              padding: "0", // Adjust padding as needed
            },
          },
          input: {
            "&::placeholder": {
              color: PrimaryTextColor,
              opacity: ".7",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            // padding: "5px 16px",
            backgroundColor: ThemeColor.primaryColor,

            "&:hover": {
              backgroundColor: ThemeColor.secondaryColor,
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            "& .MuiSlider-thumb": {
              backgroundColor: ThemeColor.primaryColor,
            },
            "& .MuiSlider-track": {
              color: ThemeColor.secondaryColor,
            },
            "& .MuiSlider-rail": {
              color: ThemeColor.secondaryColor,
              opacity: "0.3",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: "8px", // Adjust the padding value as needed
            minHeight: "unset", // Set minHeight to 'unset' or your desired value
            "&.Mui-expanded": {
              minHeight: "unset", // Adjust the expanded minHeight
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow:
              "rgb(9 30 66 / 8%) 0px 0px 0px 1px,rgb(9 30 66 / 8%) 0px 2px 4px 1px",
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: "12px", // Change the font size as needed
            margin: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "12px", // Set your desired font size here
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: 0,
            "& .MuiInputBase-root": {
              padding: 0, // Set padding to 0
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            // color: "#8B4513", // Brown color
          },
        },
      },

      MuiBadge: {
        styleOverrides: {
          badge: {
            fontSize: 12, // Adjust the font size as needed
            width: "15px",
            height: "15px",
            padding: "0px",
            borderRadius: "50%", // Make sure the badge retains a circular shape
          },
        },
      },
    },

    typography: {
      //   fontFamily: "Segoe UI, sans-serif",
      fontFamily: `'${selectedFont}', sans-serif`,
      fontSize: 12,
      button: {
        fontWeight: "500", // Set the button text to bold
        textTransform: "none", // Disable the uppercase transformation
      },
    },
  });

export default MUIThemeComp;
