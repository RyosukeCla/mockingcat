export interface Config {
    srcDir: string;
    baseUrl: string;
    port: number;
    verbose: boolean;
    middlewares: any[];
    ignore: RegExp[];
}
export declare const defaultConfig: Config;
export declare const mergeConfig: (config: Config) => Config;
