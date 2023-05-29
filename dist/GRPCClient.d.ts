export declare class GRPCClient<T> {
    client: T;
    constructor(path: string, host: string, pkg: string, service: string);
    call(fn: string, params: any): any;
}
