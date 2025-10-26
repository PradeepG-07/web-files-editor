import { exit } from 'process';
import { createClient } from 'redis';
import { RedisClientMode } from '../utils/types.js';

type RedisClientType = ReturnType<typeof createClient>;

export default class RedisClient {
    private static clients: Map<string, RedisClientType> = new Map<
        string,
        RedisClientType
    >();
    static async getClient(
        connString: string,
        forOperation: RedisClientMode = RedisClientMode.ALL
    ): Promise<RedisClientType> {
        if (!this.clients.has(forOperation)) {
            await this.initialiseConnection(connString, forOperation);
        }
        return this.clients.get(forOperation)!;
    }
    static async initialiseConnection(
        connString: string,
        forOperation: RedisClientMode = RedisClientMode.ALL
    ): Promise<void> {
        const client = createClient({
            url: connString,
        });
        client.on('error', (err) => console.log(err));
        this.clients.set(forOperation, client);
        try {
            await client.connect();
        } catch (error) {
            console.log(error);
            exit();
        }
    }
}
