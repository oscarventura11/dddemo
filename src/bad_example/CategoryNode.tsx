import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  List,
  Collapse,
} from "@mui/material";
import { useState } from "preact/hooks";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const CategoryNode = ({
  node,
  level = 1,
  selectedIds,
  handleToggle,
}: any) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0 && level < 5;

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          hasChildren ? (
            <IconButton edge="end" onClick={() => setOpen(!open)}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : null
        }
      >
        <ListItemButton onClick={() => handleToggle(node.id)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={selectedIds.includes(node.id)}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <span style={{ fontWeight: level === 1 ? "bold" : "normal" }}>
                {node.name}
              </span>
            }
          />
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {node.children.map((child: any) => (
              <CategoryNode
                key={child.id}
                node={child}
                level={level + 1}
                selectedIds={selectedIds}
                handleToggle={handleToggle}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
