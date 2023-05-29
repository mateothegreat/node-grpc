import { ServerUnaryCall } from '@grpc/grpc-js';
import { expect, test } from 'vitest';
import { GRPCClient } from '../src/GRPCClient';
import { GRPCServer } from '../src/GRPCServer';

interface RPCCallRequest {
    a: number;
    b: number;
}

interface RPCCallResponse {
    result: number;
}

test('GRPCClient', async () => {
    const doMath = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>) => {
        console.log(`requested: ${ JSON.stringify(call.request) }`);
        return {
            result: call.request.a + call.request.b
        };
    };

    const server = new GRPCServer();

    server.start('localhost:6666', 'test/test.proto');
    server.register('test', 'svc', {
        add: doMath
    });

    const clientTest = new GRPCClient(
        'test/test.proto',
        'localhost:6666',
        'test',
        'svc'
    );

    const result = await clientTest.call<RPCCallRequest, RPCCallResponse>('add', {
        a: Math.random() * 100000,
        b: Math.random() * 100000
    });
    expect(result.result).toBeGreaterThan(0);
    console.log(result);

    server.stop();
});

