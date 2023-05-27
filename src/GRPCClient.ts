const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

export class GRPCClient {
    public constructor() {

    }

    public connect(): void {

    }

    public static call(path: string, pkg: string, service: string, fn: string, params: any): any {
        return new Promise((resolve, reject) => {
            const grpcObj = protoLoader.loadSync(path, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
            const packageDefinition = grpc.loadPackageDefinition(grpcObj);
            const client = new packageDefinition[pkg][service]('localhost:6000', grpc.credentials.createInsecure());

            client[fn](params, (err, res) => {
                resolve(res);
            });
        });
    }
}
