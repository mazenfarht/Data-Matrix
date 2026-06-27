import { useCallback, useState, useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { attendees as initialData } from "../data/mockData";
import { useAttendeeFilter } from "../hooks/useAttendeeFilter";
import { useAttendeeSort } from "../hooks/useAttendeeSort";
import { useDebouncedSave } from "../hooks/useDebouncedSave";
import { useRowSelection } from "../hooks/useRowSelection";

import TableHeader from "./TableHeader";
import FilterRow from "./FilterRow";
import AttendeeRow from "./AttendeeRow";
import BatchActions from "./BatchActions";

import type { Attendee, Filters, SortConfig } from "../types/attendee";

export default function AttendeesTable() {
  const [data, setData] = useState<Attendee[]>(initialData);

  const [filters, setFilters] = useState<Filters>({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    minScore: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const filteredData = useAttendeeFilter(data, filters);
  const sortedData = useAttendeeSort(filteredData, sortConfig);

  const { selectedIds, toggleRow, selectAll, clearSelection, isSelected } =
    useRowSelection();

  const debouncedSave = useDebouncedSave();

  // --- Virtualization ---
  // We virtualize because rendering 10k DOM nodes at once tanks performance.
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 8,
  });

  // --- Sorting ---
  const handleSort = useCallback((key: keyof Attendee) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // --- Inline editing ---
  // Update local state immediately for a snappy UI, then debounce the "API" call
  const handleEdit = useCallback(
    (id: number, field: keyof Attendee, value: string | number) => {
      setData((prev) =>
        prev.map((attendee) => {
          if (attendee.id !== id) return attendee;
          const updated = { ...attendee, [field]: value };
          debouncedSave(updated);
          return updated;
        })
      );
    },
    [debouncedSave]
  );

  // --- Select all (scoped to the current filtered+sorted view) ---
  const allVisibleIds = useMemo(
    () => sortedData.map((a) => a.id),
    [sortedData]
  );

  const allSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => selectedIds.has(id));

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAll(allVisibleIds);
    }
  }, [allSelected, allVisibleIds, clearSelection, selectAll]);

  // --- Batch delete ---
  // After deleting we clear selection so stale IDs don't linger.
  // Virtualization reacts automatically because sortedData shrinks.
  const handleDeleteSelected = useCallback(() => {
    setData((prev) => prev.filter((a) => !selectedIds.has(a.id)));
    clearSelection();
  }, [selectedIds, clearSelection]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Attendees Management
        </h2>
        <span className="text-sm text-gray-500">
          {sortedData.length} Records
        </span>
      </div>

      <BatchActions
        selectedCount={selectedIds.size}
        onDeleteSelected={handleDeleteSelected}
        onClearSelection={clearSelection}
      />

      <div className="border rounded-lg overflow-hidden">
        <TableHeader
          sortConfig={sortConfig}
          onSort={handleSort}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
        />
        <FilterRow filters={filters} onChange={setFilters} />
      </div>

      {/* Virtualized scroll container — only renders visible rows */}
      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const attendee = sortedData[virtualRow.index];

            return (
              <AttendeeRow
                key={attendee.id}
                index={virtualRow.index}
                attendee={attendee}
                isSelected={isSelected(attendee.id)}
                onToggleSelect={toggleRow}
                onEdit={handleEdit}
                measureRef={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
