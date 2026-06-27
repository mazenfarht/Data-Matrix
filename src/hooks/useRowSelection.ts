import { useState, useCallback } from "react";

// Keeps track of which row IDs are currently selected.
// Using a Set for O(1) lookups when checking individual rows.
export function useRowSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleRow = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback((ids: number[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id: number) => selectedIds.has(id),
    [selectedIds]
  );

  return { selectedIds, toggleRow, selectAll, clearSelection, isSelected };
}
