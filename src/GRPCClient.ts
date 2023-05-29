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

        if (!packageDefinition[pkg]) throw new Error(`Package ${ pkg } does not exist`);
        if (!packageDefinition[pkg][service]) throw new Error(`Service ${ service } in package ${ pkg }does not exist`);

        this.client = new packageDefinition[pkg][service](host, grpc.credentials.createInsecure());
    }

    public call<T, R>(fn: string, params: T): Promise<R> {
        if (!this.client[fn]) throw new Error(`Function ${ fn } does not exist on client`);
        return new Promise(async (resolve, reject) => {
            try {
                this.client[fn](params, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
