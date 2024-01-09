import { createTheme } from "@mui/material";

export const MuiCreateTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          padding: 0,
          "& input::placeholder": {
            color: "#8B4513",
            opacity: ".9",
          },
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
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#8B4513", // Brown color
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
    fontFamily: "Segoe UI, sans-serif",
    button: {
      fontWeight: "500", // Set the button text to bold
      textTransform: "none", // Disable the uppercase transformation
    },
  },
});
