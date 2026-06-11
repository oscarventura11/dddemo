import { 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Checkbox, 
  Collapse, 
  List, 
  IconButton 
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "preact/hooks";
import { Category } from "../../domain/entities/Category";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { CategorySelected } from "../../domain/entities/CategorySelected";

interface CategoryComponentProps {
  category: Category;
  selectedState: CategorySelected;
  onToggle: (id: CategoryId) => void;
  onExpand: (id: CategoryId) => void;
}

export const CategoryComponent = ({ category, selectedState, onToggle, onExpand }: CategoryComponentProps) => {
  const [open, setOpen] = useState(false);
  const isSelected = selectedState.isSelected(category.id);

  const handleToggleOpen = (e?: any) => {
    if (e) e.stopPropagation();
    if (!open && category.children.length === 0 && !category.isLeaf()) {
       onExpand(category.id);
    }
    setOpen(!open);
  };

  const handleItemClick = () => {
    onToggle(category.id);
    if (!category.isLeaf() && !open) {
      handleToggleOpen();
    }
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          !category.isLeaf() ? (
            <IconButton edge="end" onClick={handleToggleOpen}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : null
        }
      >
        <ListItemButton onClick={handleItemClick}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={category.name.getValue()} />
        </ListItemButton>
      </ListItem>
      {!category.isLeaf() && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {category.children.map((child) => (
              <CategoryComponent
                key={child.id.getValue()}
                category={child}
                selectedState={selectedState}
                onToggle={onToggle}
                onExpand={onExpand}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
