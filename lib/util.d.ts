export declare const splitFilename: (filepath: string) => {
    name: string;
    extension: string;
};
export declare const processFilename: (filepath: string, srcDir: string, baseUrl: string) => string;
export declare const requireWithoutCache: (filepath: string) => any;
export declare const leftPad: (str: string, padding: number) => string;
export declare const logError: (e: Error) => void;
export declare const logStart: () => void;
