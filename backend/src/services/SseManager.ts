import { randomUUID } from "crypto";
import { Response } from "express";
import RedisManager from "./RedisManager.js";
import cleanedEnv from "../utils/cleanedEnv.js";
import RedisPubSubService from "./RedisPubSubService.js";
import { RedisPrefixes } from "../utils/types.js";

export default class SseManager{
    private static connections: Map<string,Response> = new Map<string,Response>;
    static async registerSubscriptionInRedis(clientId: string, subscribeToPath: string){
        const response = await RedisManager.addEntry(RedisPrefixes.REGISTERED_SUBSCRIPTIONS,clientId,subscribeToPath);
        return response;
    }
    static async createSubscription(subscribeToPath: string){
        const clientId = randomUUID();
        const registeredInRedis = await this.registerSubscriptionInRedis(clientId,subscribeToPath);
        if(!registeredInRedis) return null;
        return cleanedEnv.SSE_URI + `/${clientId}`;
    }
    static async addConnection(clientId: string, clientConnection: Response){
        //Check valid connection
        const subscribedPath = await RedisManager.getEntry(RedisPrefixes.REGISTERED_SUBSCRIPTIONS,clientId) as string;
        if(subscribedPath == null) return false;

        //Add new connection in server subscription 
        const subscribedClients = await RedisManager.getEntry(RedisPrefixes.SERVER_SUBSCRIPTIONS,subscribedPath);
        let newSubscribedClients = subscribedClients as Array<string>;
        if(subscribedClients == null){
            newSubscribedClients = [clientId];
        }else{
            newSubscribedClients.push(clientId);
        }
        await RedisManager.addEntry(RedisPrefixes.SERVER_SUBSCRIPTIONS,subscribedPath,newSubscribedClients);

        //Update local connections and subscribe server to the path
        this.connections.set(clientId,clientConnection);
        await RedisPubSubService.subscribeToChannel(subscribedPath);
        return true;
    }
    static async pushUpdatesToConnections(message: string,subscriptionPath:string){
        const subscribedClientIds = await RedisManager.getEntry(RedisPrefixes.SERVER_SUBSCRIPTIONS,subscriptionPath) as Array<string>;
        const formattedMessage = RedisPubSubService.formatSubscribedMessage(message);
        subscribedClientIds.forEach(clientId=>{
            if(this.connections.has(clientId)){
                const clientConnection = this.connections.get(clientId)!;
                this.sendMessageToConnection(clientConnection,formattedMessage);
            }
        })
    }
    static async sendMessageToConnection(connection: Response,message: string){
        connection.write(`data: ${message}\n\n`);
    }
    static async closeConnection(clientId: string){
        const subscribedPath = await RedisManager.getEntry(RedisPrefixes.REGISTERED_SUBSCRIPTIONS,clientId) as string;
        await RedisManager.clearEntry(RedisPrefixes.REGISTERED_SUBSCRIPTIONS,clientId);
        await RedisManager.clearEntry(RedisPrefixes.SERVER_SUBSCRIPTIONS,subscribedPath,[clientId]);
        this.connections.delete(clientId);
        await RedisPubSubService.decrementSubscriptionCountForChannel(subscribedPath);
    }
}