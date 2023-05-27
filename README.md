# gRPC client & server utility

```bash
$ npx ts-node test/grpc.ts
    
requested: {"payload":{"foo":"bar"},"namespace":"foo","command":"bar"}
returned: {"payload":{"taco":"bell"},"result":true,"message":"asdf"}
```

## Installation

```bash
npm install @mateothegreat/grpc
```

## Usage

### Server

```typescript
import { GRPCServer } from '@mateothegreat/grpc';

const server = new GRPCServer();

server.start('localhost:6000', 'test/messaging.proto');
server.register('Messaging', 'RPC', 'Call', method);
```

### Client

```typescript
import { GrpcClient } from '@mateothegreat/grpc';

GRPCClient.call('test/messaging.proto', 'Messaging', 'RPC', 'Call', {
    namespace: 'foo',
    command: 'bar',
    payload: {
        foo: 'bar'
    }
}).then((res) => {
    console.log(`returned: ${ JSON.stringify(res) }`);
});
```
