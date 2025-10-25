export enum RedisPrefixes {
    REGISTERED_SUBSCRIPTIONS = "registered_subscriptions",
    SERVER_SUBSCRIPTIONS = "server_subscriptions"
}
export enum RedisClientMode {
    SUBSCRIBE = "subscribe",
    ALL = "all"
}
export interface RedisPrefixDataMap {
  [RedisPrefixes.REGISTERED_SUBSCRIPTIONS]: string;
  [RedisPrefixes.SERVER_SUBSCRIPTIONS]: string[];
}
export type RedisPrefix = keyof RedisPrefixDataMap;