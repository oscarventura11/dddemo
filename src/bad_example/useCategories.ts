import { useState, useEffect } from 'preact/hooks';
import categoriesData from '../data/categories.json';

export const useCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(categoriesData);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getAllDescendantIds = (node: any): string[] => {
    let ids: string[] = [];
    if (node.children) {
      for (const child of node.children) {
        ids.push(child.id);
        ids = ids.concat(getAllDescendantIds(child));
      }
    }
    return ids;
  };

  const getParentPath = (
    nodes: any[],
    targetId: string,
    path: string[] = [],
  ): string[] | null => {
    for (const node of nodes) {
      if (node.id === targetId) return path;
      if (node.children) {
        const found = getParentPath(node.children, targetId, [
          ...path,
          node.id,
        ]);
        if (found) return found;
      }
    }
    return null;
  };

  const findNode = (nodes: any[], targetId: string): any => {
    for (const node of nodes) {
      if (node.id === targetId) return node;
      if (node.children) {
        const found = findNode(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);

      if (isSelected) {
        const node = findNode(categories, id);
        const descendants = node ? getAllDescendantIds(node) : [];
        const ancestors = getParentPath(categories, id) || [];

        const toRemove = new Set([id, ...descendants, ...ancestors]);
        return prev.filter((x) => !toRemove.has(x));
      } else {
        const node = findNode(categories, id);
        const descendants = node ? getAllDescendantIds(node) : [];

        let newSelected = new Set([...prev, id, ...descendants]);

        const ancestors = getParentPath(categories, id) || [];
        for (let i = ancestors.length - 1; i >= 0; i--) {
          const ancestorId = ancestors[i];
          const ancestorNode = findNode(categories, ancestorId);
          if (ancestorNode && ancestorNode.children) {
            const allChildrenSelected = ancestorNode.children.every(
              (child: any) => newSelected.has(child.id),
            );
            if (allChildrenSelected) {
              newSelected.add(ancestorId);
            } else {
              break;
            }
          }
        }

        return Array.from(newSelected);
      }
    });
  };

  return {
    categories,
    selectedIds,
    handleToggle,
  };
};
