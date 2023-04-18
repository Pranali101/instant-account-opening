import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Box sx={{ mx: "200px" }}>
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
