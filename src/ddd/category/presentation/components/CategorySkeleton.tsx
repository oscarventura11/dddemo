import { Skeleton, List, ListItem } from "@mui/material";

export const CategorySkeleton = () => {
  return (
    <List>
      {[1, 2, 3, 4, 5].map((i) => (
        <ListItem key={i}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </ListItem>
      ))}
    </List>
  );
};
