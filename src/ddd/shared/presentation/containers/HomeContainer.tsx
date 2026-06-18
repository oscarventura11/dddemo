import { Box, Typography, Divider, Button } from "@mui/material";
import { Link } from "preact-router/match";
import { BadExample } from "../../../../bad_example/bad";
import { CategoryTreeContainer } from "../../../category/presentation/containers/CategoryTreeContainer";
import { useInjection } from "../hooks/useInjection";
import { PolicyService } from "../../policy/application/services/PolicyService";

export function HomeContainer() {
  const policyService = useInjection<PolicyService>(PolicyService);
  const canViewAbout = policyService.canFeature("view-about-page");

  return (
    <Box sx={{ p: 3 }}>
      {canViewAbout && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Link href="/about">
            <Button variant="outlined">About</Button>
          </Link>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Typography variant="h5" gutterBottom align="center" color="error">
            Bad Example
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <BadExample />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            DDD Refactored Version
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <CategoryTreeContainer />
        </Box>
      </Box>
    </Box>
  );
}
