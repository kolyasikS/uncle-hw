import { DynamicModule } from "@nestjs/common";
export declare class DatabaseModule {
    static forRootAsync({ dbURL, redisURL, }: {
        dbURL: string;
        redisURL: string;
    }): DynamicModule;
}
