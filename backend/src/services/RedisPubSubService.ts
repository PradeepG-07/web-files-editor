import RedisClient from "../config/RedisClient.js";
import cleanedEnv from "../utils/cleanedEnv.js";
import { RedisClientMode } from "../utils/types.js";
import SseManager from "./SseManager.js";

export default class RedisPubSubService{
    private static connString:string = cleanedEnv.REDIS_PUBSUB_URI;
    private static subscribedChannels = new Map<string,number>;

    static formatPublishMessage(message: string){
        return message;
    }
    static formatSubscribedMessage(message: string){
        return message;
    }
    static async publishToChannel(channel: string,message: string){
        const formattedMessage = this.formatPublishMessage(message);
        const client = await RedisClient.getClient(this.connString);
        await client.publish(channel,formattedMessage);
    }
    static async subscribeToChannel(channel: string){
        if(!this.subscribedChannels.has(channel)){
            const client = await RedisClient.getClient(this.connString,RedisClientMode.SUBSCRIBE);
            await client.subscribe(channel,this.handleUpdates);
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
    static handleUpdates(message: string,channel: string){
        SseManager.pushUpdatesToConnections(message,channel);
    }
}