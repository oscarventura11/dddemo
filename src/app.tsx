import { CategoryTreeContainer } from "./ddd/category/presentation/containers/CategoryTreeContainer";
import { BadExample } from "./bad_example/bad";
import { CssBaseline, ThemeProvider, createTheme, Box, Typography, Divider } from "@mui/material";

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, p: 4, alignItems: "flex-start", width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Typography variant="h5" gutterBottom align="center" color="error">Bad Example</Typography>
          <Divider sx={{ mb: 4 }} />
          <BadExample />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Typography variant="h5" gutterBottom align="center" color="primary">DDD Refactored Version</Typography>
          <Divider sx={{ mb: 4 }} />
          <CategoryTreeContainer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
