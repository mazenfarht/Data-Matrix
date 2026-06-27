import React from "react";
import type { EditableCellType } from "../types/attendee";

interface EditableCellProps {
  value: string | number;
  type: EditableCellType;
  onChange: (value: string | number) => void;
}

// Single reusable cell so every column gets consistent styling and behavior.
const EditableCell = React.memo(function EditableCell({
  value,
  type,
  onChange,
}: EditableCellProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange(type === "number" ? Number(raw) : raw);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
});

export default EditableCell;
