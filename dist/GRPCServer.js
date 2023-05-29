"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRPCServer = void 0;
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
class GRPCServer {
    constructor() {
    }
    start(listen, path) {
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
    register(pkg, service, fn, cb) {
        this.server.addService(this.packageDefinition[`${pkg}.${service}`], {
            [fn]: (call, callback) => {
                try {
                    callback(null, cb(call));
                }
                catch (e) {
                    callback(e);
                }
            }
        });
    }
    stop() {
        this.server.forceShutdown();
    }
}
exports.GRPCServer = GRPCServer;
//# sourceMappingURL=GRPCServer.js.map