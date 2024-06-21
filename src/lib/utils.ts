import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | undefined) {
  if (!dateString) return;
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const ONE_HOUR = 1000 * 60 * 60;
  const ONE_MINUTE = 1000 * 60;

  const inputDate = new Date(dateString);
  const millisecondsAgo = Date.now() - inputDate.getTime();

  if (millisecondsAgo < ONE_MINUTE) return "Just now";
  if (millisecondsAgo < ONE_HOUR)
    return `${Math.floor(millisecondsAgo / ONE_MINUTE)} minutes ago`;
  if (millisecondsAgo < ONE_DAY)
    return `${Math.floor(millisecondsAgo / ONE_HOUR)} hours ago`;
  const daysAgo = Math.floor(millisecondsAgo / ONE_DAY);
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.ceil(daysAgo / 7)} weeks ago`;
  if (daysAgo < 365) return `${Math.ceil(daysAgo / 30)} months ago`;
  return `${Math.ceil(daysAgo / 365)} year ago`;
}
