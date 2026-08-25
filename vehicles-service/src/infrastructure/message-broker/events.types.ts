export const EVENT_TYPES = {
  USER_CREATED: "user.created",
} as const;

export type EventTypes = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
