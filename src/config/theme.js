import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#082c50",
      light: "#082c50",
      dark: "#082c50",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export { theme };
