export interface QueueMessageClient<T> {
    connect(url: string): Promise<void>;
    getChannel(): T;
    disconnect(): Promise<void>;
}
