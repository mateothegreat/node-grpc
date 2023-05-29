"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRPCClient = void 0;
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
class GRPCClient {
    constructor(path, host, pkg, service) {
        const grpcObj = protoLoader.loadSync(path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const packageDefinition = grpc.loadPackageDefinition(grpcObj);
        if (!packageDefinition[pkg])
            throw new Error(`Package ${pkg} does not exist`);
        if (!packageDefinition[pkg][service])
            throw new Error(`Service ${service} in package ${pkg}does not exist`);
        this.client = new packageDefinition[pkg][service](host, grpc.credentials.createInsecure());
    }
    call(fn, params) {
        if (!this.client[fn])
            throw new Error(`Function ${fn} does not exist on client`);
        return new Promise(async (resolve, reject) => {
            try {
                this.client[fn](params, (err, res) => {
                    if (err)
                        reject(err);
                    resolve(res);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.GRPCClient = GRPCClient;
//# sourceMappingURL=GRPCClient.js.map