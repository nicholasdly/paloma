import { type ClassValue, clsx } from "clsx";
import { isToday, isYesterday, subMonths, subWeeks } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Chat } from "@/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tc<T>(
  promise: Promise<T>,
): Promise<[T, null] | [null, Error]> {
  try {
    return [await promise, null];
  } catch (error) {
    if (error instanceof Error) return [null, error];
    throw error;
  }
}

export function groupChats(chats: Chat[]) {
  const now = new Date();
  return chats.reduce<{
    today: Chat[];
    yesterday: Chat[];
    week: Chat[];
    month: Chat[];
    older: Chat[];
  }>(
    (groups, chat) => {
      if (isToday(chat.createdAt)) {
        groups.today.push(chat);
      } else if (isYesterday(chat.createdAt)) {
        groups.yesterday.push(chat);
      } else if (chat.createdAt > subWeeks(now, 1)) {
        groups.week.push(chat);
      } else if (chat.createdAt > subMonths(now, 1)) {
        groups.month.push(chat);
      } else {
        groups.older.push(chat);
      }
      return groups;
    },
    {
      today: [],
      yesterday: [],
      week: [],
      month: [],
      older: [],
    },
  );
}
