import RedisClient from "../config/RedisClient.js";
import cleanedEnv from "../utils/cleanedEnv.js";
import { Operation, RedisClientMode } from "../utils/types.js";
import SseManager from "./SseManager.js";

export default class RedisPubSubService{
    private static connString:string = cleanedEnv.REDIS_PUBSUB_URI;
    private static subscribedChannels = new Map<string,number>;

    static formatPublishMessage(event: Operation,data: string){
        return `event: ${event} ${data}`;
    }
    static formatSubscribedMessage(message: string){
        const parts = message.replace('event: ', '').split(' ');
        const event = parts[0];
        const data = parts.slice(1).join(' '); 
        return {
            event: event as Operation,
            data
        }
    }
    static async publishToChannel(channel: string,event: Operation, data: string){
        const formattedMessage = this.formatPublishMessage(event,data);
        const client = await RedisClient.getClient(this.connString);
        await client.publish(channel,formattedMessage);
    }
    static async subscribeToChannel(channel: string){
        if(!this.subscribedChannels.has(channel)){
            const client = await RedisClient.getClient(this.connString,RedisClientMode.SUBSCRIBE);
            await client.subscribe(channel,this.updatesListener);
        }
        const numberOfConnectionsSubscribed = this.subscribedChannels.get(channel) ?? 0;
        this.subscribedChannels.set(channel,numberOfConnectionsSubscribed + 1);
        return true;
    }
    static async unsubscribeFromChannel(channel: string){
        const client = await RedisClient.getClient(this.connString);
        await client.unsubscribe(channel,(message: string, channel: string)=>{
            console.log(message);
            console.log(`Unsubscribed from channel ${channel}`);
        });
    }
    static async decrementSubscriptionCountForChannel(channel: string){
        const numberOfConnectionsSubscribed = (this.subscribedChannels.get(channel) ?? 0) - 1;
        console.log(`Channel: ${channel} connections: ${numberOfConnectionsSubscribed}`);
        if(numberOfConnectionsSubscribed<=0){
            await this.unsubscribeFromChannel(channel);
        }
        
        return true;
    }
    static updatesListener(message: string,channel: string){
        SseManager.pushUpdatesToConnections(message,channel);
    }
}