import { ServerUnaryCall } from '@grpc/grpc-js';
import { GRPCServer } from '../src/GRPCServer';
import { RPCCallRequest, RPCCallResponse } from './messaging';

const doMath = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>) => {
    console.log(`requested: ${ JSON.stringify(call.request) }`);
    return {
        result: call.request.a + call.request.b
    };
};

const server = new GRPCServer();

server.start('localhost:6666', 'test/proto/test.proto');

server.register('test', 'svc', {
    add: doMath
});

