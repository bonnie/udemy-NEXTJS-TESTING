import dayjs from "dayjs";

export function formatDate(dateToFormat: Date): string {
  return dayjs(dateToFormat).format("YYYY MMM D").toLowerCase();
}
