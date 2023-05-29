import * as grpc from '@grpc/grpc-js';
import { PackageDefinition } from '@grpc/proto-loader';
export declare class GRPCServer {
    server: grpc.Server;
    packageDefinition: PackageDefinition;
    constructor();
    start(listen: string, path: string): void;
    register(pkg: string, service: string, fn: string, cb: Function): void;
    stop(): void;
}
