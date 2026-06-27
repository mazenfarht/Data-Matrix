export interface Attendee {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  score: number;
}

export interface Filters {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  minScore: string;
}

export interface SortConfig {
  key: keyof Attendee;
  direction: "asc" | "desc";
}
export type EditableCellType = "text" | "email" | "number" | "date";
