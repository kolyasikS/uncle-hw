import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import {
  createAdminMessages,
  getAdminMessages,
} from "@/domain/messages/admin.messages";
import { loginMessages } from "@/domain/messages/auth.messages";
import { otpVerificationMessages } from "@/domain/messages/otp.messages";
import {
  createUserMessages,
  getUserByIdMessages,
} from "@/domain/messages/user.messages";

export class ValidationPipeException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(...errors.map((error) => Object.values(error.constraints ?? ""))[0]);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(createUserMessages.alreadyExists(email), HttpStatus.CONFLICT);
    this.name = "UserAlreadyExistsException";
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(getUserByIdMessages.notFound(id), HttpStatus.NOT_FOUND);
    this.name = "UserNotFoundException";
  }
}

export class AdminNotFoundException extends HttpException {
  constructor(email: string) {
    super(getAdminMessages.notFoundEmail(email), HttpStatus.NOT_FOUND);
    this.name = "AdminNotFoundException";
  }
}

export class AdminAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(createAdminMessages.alreadyExists(email), HttpStatus.CONFLICT);
    this.name = "AdminAlreadyExistsException";
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(loginMessages.invalidCredentials, HttpStatus.UNAUTHORIZED);
    this.name = "InvalidCredentialsException";
  }
}

export class InvalidOtpException extends HttpException {
  constructor() {
    super(otpVerificationMessages.failure, HttpStatus.NOT_FOUND);
    this.name = "InvalidOtpException";
  }
}

export class ExpiredOtpException extends HttpException {
  constructor() {
    super(otpVerificationMessages.expired, HttpStatus.NOT_FOUND);
    this.name = "ExpiredOtpException";
  }
}
