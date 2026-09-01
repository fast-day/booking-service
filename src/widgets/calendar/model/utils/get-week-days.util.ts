import { addDays } from "date-fns";

export function getWeekDays(start: Date) {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}