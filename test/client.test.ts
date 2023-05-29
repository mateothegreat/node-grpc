import { expect, test } from 'vitest';
import { GRPCClient } from '../src/GRPCClient';

test('GRPCClient', async () => {
    const clientTest = new GRPCClient(
        'test/proto/test.proto',
        'localhost:6666',
        'test',
        'svc'
    );
    expect(await clientTest.call('successful', {
        namespace: 'foo',
        command: 'bar',
        payload: {
            foo: 'bar'
        }
    })).toBeTypeOf('object');
});

