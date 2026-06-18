import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppRoutes } from "./ddd/shared/presentation/routes/AppRoutes.route";

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
