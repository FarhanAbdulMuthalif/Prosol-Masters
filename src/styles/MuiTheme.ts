import { createTheme } from "@mui/material";

export const MuiCreateTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        // inputMultiline: {
        //   "&::placeholder": {
        //     color: "brown", // Change the color as needed
        //   },
        // },
        root: {
          fontSize: "12px",
          padding: 0,
          "& input::placeholder": {
            color: "brown",
            opacity: ".7",
          },
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
    fontSize: 12,
    button: {
      fontWeight: "500", // Set the button text to bold
      textTransform: "none", // Disable the uppercase transformation
    },
  },
});
