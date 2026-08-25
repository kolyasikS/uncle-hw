import { HttpException } from "@nestjs/common";
import { EventType } from "./constants";
export type ApiResponseType<T> = {
    data: T;
    statusCode: number;
    message?: string;
    event?: EventType;
};
export declare class ApiResponse {
    static success<T>({ data, message, event, statusCode, }: {
        data: T;
        message?: string;
        event?: EventType;
        statusCode?: number;
    }): ApiResponseType<T>;
    static failure({ exception, }: {
        exception: HttpException | Error;
    }): ApiResponseType<null>;
}
