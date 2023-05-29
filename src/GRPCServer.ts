import * as grpc from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import * as protoLoader from '@grpc/proto-loader';
import { PackageDefinition } from '@grpc/proto-loader';
import { GRPCImplementation } from './GRPCImplementation';

export class GRPCServer {
    public server: grpc.Server;
    public packageDefinition: PackageDefinition;
    public clients: ServiceClient[] = [];

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

    public register(pkg: string, service: string, implementation: GRPCImplementation): void {
        const impl = {};
        for (const fn in implementation) {
            impl[fn] = (call: any, callback: any) => {
                try {
                    callback(null, implementation[fn](call, callback));
                } catch (e) {
                    callback(e);
                }
            };
        }
        this.server.addService(this.packageDefinition[`${ pkg }.${ service }`] as any, impl);
    }

    public stop(): void {
        this.server.forceShutdown();
    }
}
