import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import { useInjection } from "../hooks/useInjection";
import { PolicyState } from "../../policy/application/state/PolicyState";
import { UserRole } from "../../policy/domain/models/UserRole";
import { POLICY_WHITELIST } from "../../constants/policy.constants";

export const UserSelector = () => {
  const state = useInjection<PolicyState>(PolicyState);
  const currentRole = state.role.value;
  const currentEmail = state.email.value;

  const handleRoleChange = (event: any) => {
    state.setRole(event.target.value as UserRole);
  };

  const handleEmailChange = (event: any) => {
    state.setEmail(event.target.value);
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: "1px dashed grey", borderRadius: 1 }}>
      <Typography variant="caption" sx={{ display: "block" }} gutterBottom>
        [Dev Tools] User Context
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={currentRole}
          label="Role"
          onChange={handleRoleChange}
        >
          <MenuItem value={UserRole.ADMIN}>Admin (Can Submit)</MenuItem>
          <MenuItem value={UserRole.USER}>Regular User (Blocked)</MenuItem>
          <MenuItem value={UserRole.GUEST}>Guest (Blocked)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        label="Email (for Whitelist)"
        value={currentEmail}
        onChange={handleEmailChange}
        placeholder="e.g. allowed@domain.com"
      />
      {currentEmail && (
        <Typography
          variant="caption"
          sx={{ mt: 1, display: "block", color: "text.secondary" }}
        >
          Whitelist includes: {POLICY_WHITELIST.join(", ")}
        </Typography>
      )}
    </Box>
  );
};
