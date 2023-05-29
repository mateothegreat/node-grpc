# gRPC client & server utility

```bash
$ npx ts-node test/server.ts
    
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

const doMath = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>) => {
    console.log(`requested: ${ JSON.stringify(call.request) }`);
    return {
        result: call.request.a + call.request.b
    };
};

const server = new GRPCServer();

server.start('localhost:6666', 'test/test.proto');
server.register('test', 'svc', {
    add: doMath,
    some: thing,
    other: doOtherWork
});
```

### Client

```typescript
import { GrpcClient } from '@mateothegreat/grpc';

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

console.log(result);
```

## Nest.js

```typescript
import { GRPCImplementation } from '@mateothegreat/grpc/GRPCImplementation';
import { GRPCServer } from '@mateothegreat/grpc/GRPCServer';
import { Injectable } from '@nestjs/common';
import { CameraControllerService } from '../Cameras/Controller/CameraControllerService';
import { CameraLogService } from '../Cameras/Logs/CameraLogService';

@Injectable()
export class GRPCService {
    private server: GRPCServer;

    public constructor(private readonly cameraLogService: CameraLogService,
                       private readonly cameraControllerService: CameraControllerService) {
        this.server = new GRPCServer();
        this.server.start('localhost:6000', 'proto/schema.proto');
        this.server.register('cameras', 'rpc', {
            log: this.cameraLogService.create
        });
    }

    public register(pkg: string, service: string, implementation: GRPCImplementation): void {
        console.log(`registering ${ pkg }/${ service }/${ Object.keys(implementation).join(', ') }`);
        this.server.register('cameras', 'rpc', {
            log: this.cameraLogService.create
        });
    }
}
```
