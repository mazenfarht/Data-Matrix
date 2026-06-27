import React from "react";

interface BatchActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
}

// Only shown when at least one row is selected
export default function BatchActions({
  selectedCount,
  onDeleteSelected,
  onClearSelection,
}: BatchActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <span className="text-sm font-medium text-blue-800">
        {selectedCount} row{selectedCount !== 1 ? "s" : ""} selected
      </span>

      <button
        onClick={onDeleteSelected}
        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Delete Selected
      </button>

      <button
        onClick={onClearSelection}
        className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
      >
        Clear Selection
      </button>
    </div>
  );
}
