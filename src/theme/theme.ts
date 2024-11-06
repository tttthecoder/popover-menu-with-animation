import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  spacing: 8, // Setting the base spacing as 8px
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#000", // Adjust as per your design requirements
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "8px",
          borderRadius: "8px",
        },
      },
    },
  },
});
