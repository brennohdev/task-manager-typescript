import { ErrorRequestHandler, Response } from 'express';
import { HTTPSTATUS } from '../config/http';
import { AppError } from '../../shared/utils/appError';
import { object, z, ZodError } from 'zod';
import { ErrorCodeEnum } from '../../domain/enums/errorCode';

function handleSyntaxError(error: SyntaxError, res: Response) {
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: 'Invalid JSON format. Please check your request body.',
  });
}

function handleAppError(error: AppError, res: Response) {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
}

function handleUnknownError(error: any, res: Response) {
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: error?.message || 'Unknown error occurred',
  });
}

function handleZodError(error: z.ZodError, res: Response) {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: 'Validation failed',
    erros: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  console.error(`Error Occurred on PATH: ${req.path}`, error);

  if (error instanceof SyntaxError) return handleSyntaxError(error, res);
  if (error instanceof AppError) return handleAppError(error, res);
  if (error instanceof ZodError) return handleZodError(error, res);

  return handleUnknownError(error, res);
};
