export interface Attendee {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  score: number;
}

export const attendees: Attendee[] = Array.from(
  { length: 10000 },
  (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@gmail.com`,
    joinDate: "2026-06-24",
    score: Math.floor(Math.random() * 100),
  })
);
