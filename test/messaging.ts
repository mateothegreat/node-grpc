export interface RPCCallRequest {
    namespace: string;
    command: string;
    payload: { [key: string]: string };
}

export interface RPCCallResponse {
    result: boolean;
    message?: string;
    payload: { [key: string]: string };
}
