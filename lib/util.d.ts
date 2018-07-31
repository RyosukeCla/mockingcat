export declare const splitFilename: (filename: string) => {
    name: string;
    extension: string;
};
export declare const processFilename: (filename: string) => string;
export declare const leftPad: (str: string, padding: number) => string;
export declare const logError: (e: Error) => void;
export declare const logStart: () => void;
