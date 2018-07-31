import { Config } from './config';
import * as fastify from 'fastify';
export default class Mockingcat {
    private server;
    private wacther;
    private config;
    constructor(config?: Config);
    getFastifyInstance(): fastify.FastifyInstance;
    start(): void;
}
