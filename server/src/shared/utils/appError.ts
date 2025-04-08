import { HTTPSTATUS, HttpStatusCodeType } from "../../infrastructure/config/http";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../../domain/enums/errorCode";


//Base class for all errors in the application
export class AppError extends Error {
    public statusCode: HttpStatusCodeType;
    public errorCode?: ErrorCodeEnumType;

    constructor(
        message: string,
        statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
        errorCode?: ErrorCodeEnumType,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/// Custom error classes for specific error types
export class HttpException extends AppError {
    constructor(
        message: string,
        statusCode: HttpStatusCodeType,
        errorCode?: ErrorCodeEnumType,
    ) {
        super(
            message,
            statusCode,
            errorCode
        )
    }
}

/// Class for specific error types
export class InternalServerException extends AppError {
    constructor(
        message = "Internal server error",
        errorCode: ErrorCodeEnumType = ErrorCodeEnum.INTERNAL_SERVER_ERROR,
    ) {
        super(
            message,
            HTTPSTATUS.INTERNAL_SERVER_ERROR,
            errorCode
        );
    }
} // Error 500 - Server is broken

export class BadRequestException extends AppError {
    constructor(
        message = "Bad request",
        errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR,
    ) {
        super(
            message,
            HTTPSTATUS.BAD_REQUEST,
            errorCode
        );
    }
} // Error 400 - Datas are not valid

export class NotFoundException extends AppError {
    constructor(
        message = "Resource not found",
        errorCode: ErrorCodeEnumType = ErrorCodeEnum.RESOURCE_NOT_FOUND
    ) {
        super(
            message,
            HTTPSTATUS.NOT_FOUND,
            errorCode
        )
    }
} // Error 404 - Resource not found

export class UnauthorizedException extends AppError {
    constructor(
        message = "Unauthorized",
        errorCode: ErrorCodeEnumType = ErrorCodeEnum.ACCESS_UNAUTHORIZED,
    ) {
        super(
            message,
            HTTPSTATUS.UNAUTHORIZED,
            errorCode
        );
    }
} // Error 401 - User is not authenticated

