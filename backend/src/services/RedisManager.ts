import cleanedEnv from "../utils/cleanedEnv.js";
import RedisClient from "../config/RedisClient.js";
import { RedisPrefix, RedisPrefixDataMap, RedisPrefixes } from "../utils/types.js";
import { randomUUID } from "crypto";

export default class RedisManager{
    private static connString = cleanedEnv.REDIS_URI;
    private static serverId = randomUUID();
    static async handleAsync<T>(asyncPromise: T, returnValueOnReject: T): Promise<T>{
        try {
            return await asyncPromise; 
        } catch (error) {
        console.log(error);
            return returnValueOnReject;
        }
    }
    static async addEntry<k extends RedisPrefix>(prefix: RedisPrefix,key: string,data: RedisPrefixDataMap[k]): Promise<boolean>{
        const client = await RedisClient.getClient(this.connString);  
        return new Promise<boolean>(async (resolve)=>{
            if(!client.isOpen){
                return resolve(false);
            }
            if(prefix == RedisPrefixes.REGISTERED_SUBSCRIPTIONS){
                const promise = client.set(`${prefix}-${this.serverId}:${key}`,data as string);
                const response = await this.handleAsync(promise,null);
                if(response == null) return resolve(false);
                return resolve(true);
            }else if(prefix == RedisPrefixes.SERVER_SUBSCRIPTIONS){
                const promise = client.sAdd(`${prefix}-${this.serverId}:${key}`,data);
                const response = await this.handleAsync(promise,null);
                if(response == null) return resolve(false);
                return resolve(response==data.length);
            }
            return resolve(false);
        });
    }

    static async getEntry(prefix: RedisPrefix,key: string){
        const client = await RedisClient.getClient(this.connString);  
         if(!client.isOpen){
            return null;
        }
        if(prefix == RedisPrefixes.REGISTERED_SUBSCRIPTIONS){
            const promise = client.get(`${prefix}-${this.serverId}:${key}`);
            const response = await this.handleAsync(promise,null);
            return response;
        }else if(prefix == RedisPrefixes.SERVER_SUBSCRIPTIONS){
            const promise = client.sMembers(`${prefix}-${this.serverId}:${key}`);
            const response = await this.handleAsync(promise,null);
            return response;
        }
        return null;
    }
    
    static async clearEntry(prefix: RedisPrefix,key: string,members?: string[]){
        const client = await RedisClient.getClient(this.connString);  
        if(prefix == RedisPrefixes.REGISTERED_SUBSCRIPTIONS){
            const promise = client.del(`${prefix}-${this.serverId}:${key}`);
            const response = await this.handleAsync(promise,null);
            return response;
        }else if(prefix == RedisPrefixes.SERVER_SUBSCRIPTIONS){
            const promise = client.sRem(`${prefix}-${this.serverId}:${key}`,members!);
            const response = await this.handleAsync(promise,null);
            return response;
        }
       return null;
    }
    
}