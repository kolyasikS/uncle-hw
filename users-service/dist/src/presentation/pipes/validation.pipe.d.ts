import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidationPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata): Promise<any>;
    private isClass;
}
