import React from "react";
import type { Attendee } from "../types/attendee";
import EditableCell from "./EditableCell";

interface AttendeeRowProps {
  attendee: Attendee;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (id: number, field: keyof Attendee, value: string | number) => void;
  measureRef: (node: HTMLDivElement | null) => void;
  style: React.CSSProperties;
}

// Wrapped in React.memo so virtualized rows don't rerender unless their data changes.
// With 10k rows this makes a noticeable difference.
const AttendeeRow = React.memo(function AttendeeRow({
  attendee,
  isSelected,
  onToggleSelect,
  onEdit,
  measureRef,
  style,
}: AttendeeRowProps) {
  return (
    <div
      ref={measureRef}
      className={`grid grid-cols-[40px_1fr_1fr_1fr_1fr] border-b ${
        isSelected ? "bg-blue-50" : "bg-white"
      }`}
      style={style}
    >
      <div className="p-4 flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(attendee.id)}
          aria-label={`Select ${attendee.name}`}
        />
      </div>

      <div className="p-4">
        <EditableCell
          type="text"
          value={attendee.name}
          onChange={(v) => onEdit(attendee.id, "name", v)}
        />
      </div>

      <div className="p-4">
        <EditableCell
          type="email"
          value={attendee.email}
          onChange={(v) => onEdit(attendee.id, "email", v)}
        />
      </div>

      <div className="p-4">
        <EditableCell
          type="date"
          value={attendee.joinDate}
          onChange={(v) => onEdit(attendee.id, "joinDate", v)}
        />
      </div>

      <div className="p-4">
        <EditableCell
          type="number"
          value={attendee.score}
          onChange={(v) => onEdit(attendee.id, "score", v)}
        />
      </div>
    </div>
  );
});

export default AttendeeRow;
