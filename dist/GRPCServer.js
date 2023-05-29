"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRPCServer = void 0;
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
class GRPCServer {
    constructor() {
        this.clients = [];
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
    register(pkg, service, implementation) {
        const impl = {};
        for (const fn in implementation) {
            impl[fn] = (call, callback) => {
                try {
                    callback(null, implementation[fn](call, callback));
                }
                catch (e) {
                    callback(e);
                }
            };
        }
        this.server.addService(this.packageDefinition[`${pkg}.${service}`], impl);
    }
    stop() {
        this.server.forceShutdown();
    }
}
exports.GRPCServer = GRPCServer;
//# sourceMappingURL=GRPCServer.js.map