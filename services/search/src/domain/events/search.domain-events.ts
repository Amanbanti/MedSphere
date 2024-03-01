export const SEARCH_EVENT_TYPES = {
  CREATED: 'SEARCH.CREATED',
  UPDATED: 'SEARCH.UPDATED',
  DELETED: 'SEARCH.DELETED',
} as const;

export type SearchEventType =
  (typeof SEARCH_EVENT_TYPES)[keyof typeof SEARCH_EVENT_TYPES];
