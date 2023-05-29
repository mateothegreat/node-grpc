export interface GRPCImplementation {
    [key: string]: (call: any, callback: any) => any;
}
