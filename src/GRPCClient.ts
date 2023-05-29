import * as grpc from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import * as protoLoader from '@grpc/proto-loader';

export class GRPCClient {
    public client: ServiceClient;

    public constructor(path: string, host: string, pkg: string, service: string) {
        const grpcObj = protoLoader.loadSync(path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const packageDefinition = grpc.loadPackageDefinition(grpcObj);
        this.client = new packageDefinition[pkg][service](host, grpc.credentials.createInsecure());
    }

    public call<T>(fn: string, params: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client[fn](params, (err, res) => {
                resolve(res);
            });
        });
    }
}
