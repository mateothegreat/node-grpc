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
        this.client = new packageDefinition[pkg][service](host, grpc.credentials.createInsecure());
    }
    call(fn, params) {
        return new Promise((resolve, reject) => {
            this.client[fn](params, (err, res) => {
                resolve(res);
            });
        });
    }
}
exports.GRPCClient = GRPCClient;
//# sourceMappingURL=GRPCClient.js.map