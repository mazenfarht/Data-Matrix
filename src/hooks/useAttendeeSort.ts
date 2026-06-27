import type { Attendee, SortConfig } from "../types/attendee";

export function useAttendeeSort(
  attendees: Attendee[],
  sortConfig: SortConfig | null
) {
  const sortedData = [...attendees];

  if (!sortConfig) return sortedData;

  sortedData.sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;

    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  return sortedData;
}
