import type { Filters } from "../types/attendee";

interface FilterRowProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterRow({ filters, onChange }: FilterRowProps) {
  const set = (field: keyof Filters, value: string) =>
    onChange({ ...filters, [field]: value });

  return (
    <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] bg-gray-50 border-b">
      {/* empty cell to line up with the checkbox column */}
      <div />

      <div className="p-2">
        <input
          type="search"
          placeholder="Search Name"
          value={filters.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="p-2">
        <input
          type="search"
          placeholder="Search Email"
          value={filters.email}
          onChange={(e) => set("email", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="p-2 flex gap-2">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => set("startDate", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-2 py-2"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => set("endDate", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-2 py-2"
        />
      </div>

      <div className="p-2">
        <input
          type="number"
          placeholder="Min Score"
          value={filters.minScore}
          onChange={(e) => set("minScore", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
