import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
export declare class GRPCClient {
    client: ServiceClient;
    constructor(path: string, host: string, pkg: string, service: string);
    call<T, R>(fn: string, params: T): Promise<R>;
}
