import * as fastify from 'fastify';
import { Config } from './config';
export default class MockingcatServer {
    private app;
    private config;
    constructor(config: Config);
    getFastifyInstence(): fastify.FastifyInstance;
    stop(): Promise<void>;
    reset(): void;
    start(): void;
    private setup;
    private register;
}
