import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#ff7043" },
    background: { default: "#f4f6fb" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: { defaultProps: { elevation: 0 } },
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});
