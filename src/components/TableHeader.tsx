import type { Attendee, SortConfig } from "../types/attendee";

interface TableHeaderProps {
  sortConfig: SortConfig | null;
  onSort: (key: keyof Attendee) => void;
  allSelected: boolean;
  onSelectAll: () => void;
}

const COLUMNS: { label: string; key: keyof Attendee }[] = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "joinDate" },
  { label: "Score", key: "score" },
];

function SortIndicator({
  columnKey,
  sortConfig,
}: {
  columnKey: keyof Attendee;
  sortConfig: SortConfig | null;
}) {
  if (!sortConfig || sortConfig.key !== columnKey) return null;
  return <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>;
}

export default function TableHeader({
  sortConfig,
  onSort,
  allSelected,
  onSelectAll,
}: TableHeaderProps) {
  return (
    <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] bg-gray-100 font-bold text-gray-700 border-b">
      <div className="p-4 flex items-center justify-center">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          aria-label="Select all rows"
        />
      </div>

      {COLUMNS.map(({ label, key }) => (
        <div
          key={key}
          className="p-4 cursor-pointer select-none"
          onClick={() => onSort(key)}
        >
          {label}
          <SortIndicator columnKey={key} sortConfig={sortConfig} />
        </div>
      ))}
    </div>
  );
}
