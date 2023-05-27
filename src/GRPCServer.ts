import { Server } from '@grpc/grpc-js/src/server';
import { PackageDefinition } from '@grpc/proto-loader';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

export class GRPCServer {
    public server: Server;
    public packageDefinition: PackageDefinition;

    public constructor() {

    }

    public start(listen: string, path: string): void {
        this.packageDefinition = protoLoader.loadSync(path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });

        this.server = new grpc.Server();
        this.server.bindAsync(listen, grpc.ServerCredentials.createInsecure(), () => {
            this.server.start();
        });
    }

    public register(pkg: string, service: string, fn: string, cb: Function): void {
        this.server.addService(this.packageDefinition['Messaging.RPC'] as any, {
            [fn]: (call: any, callback: any) => {
                try {
                    callback(null, cb(call));
                } catch (e) {
                    callback(e);
                }
            }
        });
    }

    public stop(): void {
        this.server.forceShutdown();
    }
}