import { useMemo } from "react";
import type { Attendee, Filters } from "../types/attendee";

export function useAttendeeFilter(attendees: Attendee[], filters: Filters) {
  return useMemo(() => {
    return attendees.filter((attendee) => {
      const matchesName = attendee.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      const matchesEmail = attendee.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());

      const matchesScore =
        !filters.minScore || attendee.score >= Number(filters.minScore);

      const attendeeDate = new Date(attendee.joinDate);

      const matchesStartDate =
        !filters.startDate || attendeeDate >= new Date(filters.startDate);

      const matchesEndDate =
        !filters.endDate || attendeeDate <= new Date(filters.endDate);

      return (
        matchesName &&
        matchesEmail &&
        matchesScore &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [attendees, filters]);
}
