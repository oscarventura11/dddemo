import { useCategories } from "./useCategories";
import { CategoryNode } from "./CategoryNode";
import { Box, Typography, Paper, List, CircularProgress } from "@mui/material";

export const BadExample = () => {
  const { categories, selectedIds, handleToggle } = useCategories();

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: "auto", width: "100%" }}>
      <Typography variant="h4" gutterBottom color="error">Bad Example (Hook Logic)</Typography>
      <Paper elevation={3}>
        {categories.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {categories.map((level1) => (
              <CategoryNode
                key={level1.id}
                node={level1}
                level={1}
                selectedIds={selectedIds}
                handleToggle={handleToggle}
              />
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};
