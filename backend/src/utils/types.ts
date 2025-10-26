export enum RedisPrefixes {
    REGISTERED_SUBSCRIPTIONS = "registered_subscriptions",
    SERVER_SUBSCRIPTIONS = "server_subscriptions"
}
export enum RedisClientMode {
    SUBSCRIBE = "subscribe",
    ALL = "all"
}
export enum Operations {
  FILE_CREATE = "file_create",
  FILE_EDIT = "file_edit",
  FILE_DELETE = "file_delete",
  FILE_CUT = "file_cut",
  FILE_COPY = "file_copy",
  
  DIRECTORY_CREATE = "directory_create",
  DIRECTORY_EDIT = "directory_edit",
  DIRECTORY_DELETE = "directory_delete",
  DIRECTORY_CUT = "directory_cut",
  DIRECTORY_COPY = "directory_copy",
}
export interface RedisPrefixDataMap {
  [RedisPrefixes.REGISTERED_SUBSCRIPTIONS]: string;
  [RedisPrefixes.SERVER_SUBSCRIPTIONS]: string[];
}
export type RedisPrefix = keyof RedisPrefixDataMap;
export type Operation =typeof Operations[keyof typeof Operations];