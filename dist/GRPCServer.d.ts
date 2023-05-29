import * as grpc from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { PackageDefinition } from '@grpc/proto-loader';
import { GRPCImplementation } from './GRPCImplementation';
export declare class GRPCServer {
    server: grpc.Server;
    packageDefinition: PackageDefinition;
    clients: ServiceClient[];
    constructor();
    start(listen: string, path: string): void;
    register(pkg: string, service: string, implementation: GRPCImplementation): void;
    stop(): void;
}
