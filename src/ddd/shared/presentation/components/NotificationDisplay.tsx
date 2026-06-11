import { Snackbar, Alert } from "@mui/material";
import { useInjection } from "../hooks/useInjection";
import { NotificationState } from "../../notification/application/state/NotificationState";
import { NotificationService } from "../../notification/application/services/NotificationService";

export const NotificationDisplay = () => {
  const state = useInjection<NotificationState>(NotificationState);
  const service = useInjection<NotificationService>(NotificationService);
  const current = state.current.value;

  const handleClose = () => {
    service.clear();
  };

  if (!current) return null;

  return (
    <Snackbar open={!!current} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={current.type} sx={{ width: "100%" }}>
        {current.message}
      </Alert>
    </Snackbar>
  );
};
