import { BadRequestException, HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
export declare class ValidationPipeException extends BadRequestException {
    constructor(errors: ValidationError[]);
}
export declare class UserAlreadyExistsException extends HttpException {
    constructor(email: string);
}
export declare class UserNotFoundException extends HttpException {
    constructor(id: string);
}
export declare class AdminNotFoundException extends HttpException {
    constructor(email: string);
}
export declare class InvalidCredentialsException extends HttpException {
    constructor();
}
