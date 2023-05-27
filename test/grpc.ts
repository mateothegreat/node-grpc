import { ServerUnaryCall } from '@grpc/grpc-js';
import { GRPCClient } from '../src/GRPCClient';
import { GRPCServer } from '../src/GRPCServer';
import { RPCCallRequest, RPCCallResponse } from './messaging';

const method = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>, callback: any) => {
    console.log(`requested: ${ JSON.stringify(call.request) }`);
    return {
        result: true,
        message: 'asdf',
        payload: {
            taco: 'bell'
        }
    };
};

const server = new GRPCServer();

server.start('localhost:6000', '/Users/matthewdavis/workspace/nvr/packages/grpc/test/proto/messaging.proto');
server.register('Messaging', 'RPC', 'Call', method);

GRPCClient.call('/Users/matthewdavis/workspace/nvr/packages/grpc/test/proto/messaging.proto', 'Messaging', 'RPC', 'Call', {
    namespace: 'foo',
    command: 'bar',
    payload: {
        foo: 'bar'
    }
}).then((res) => {
    server.stop();
    console.log(`returned: ${ JSON.stringify(res) }`);
});

