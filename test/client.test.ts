import { expect, test } from 'vitest';
import { GRPCClient } from '../src/GRPCClient';
import { RPCCallRequest, RPCCallResponse } from './messaging';

test('GRPCClient', async () => {
    const clientTest = new GRPCClient(
        'test/proto/test.proto',
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
});

