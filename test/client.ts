import { GRPCClient } from '../src/GRPCClient';

const client = new GRPCClient(
    '/Users/matthewdavis/workspace/nvr/packages/prisma/proto/schema.proto',
    'localhost:6000',
    'rpc',
    'cameras'
);

client.call('log', {
    namespace: 'foo',
    command: 'bar',
    payload: {
        foo: 'bar'
    }
}).then((res) => {
    console.log(`returned: ${ JSON.stringify(res) }`);
}).catch(e => {
    console.log(e);
});

