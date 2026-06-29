import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { Link } from "preact-router/match";

export function AboutContainer() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h3">About This Demo</Typography>
          <Typography variant="body1">
            This project demonstrates a refactor from a tightly coupled UI to a
            DDD + Hexagonal architecture with explicit domain boundaries,
            application services, and infrastructure adapters.
          </Typography>
          <Typography variant="body1">
            The policy system centralizes authorization decisions and now also
            guards route access for development-only pages.
          </Typography>
          <Box>
            <Link path="/">
              <Button variant="contained">Back to Home</Button>
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
