import { Box, Typography } from "@mui/material";

export function NotFoundContainer() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        404
      </Typography>
      <Typography color="text.secondary">Page not found.</Typography>
    </Box>
  );
}
