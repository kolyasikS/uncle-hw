import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationPipeException } from "@/domain/exceptions/domain.exceptions";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // No DTO class provided
    if (!metatype || !this.isClass(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new ValidationPipeException(errors);
    }

    return object;
  }

  private isClass(metatype: any): boolean {
    return ![String, Boolean, Number, Array, Object].includes(metatype);
  }
}
