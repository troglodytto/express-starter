import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/error';

export default async function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.name === 'AppError') {
    return res.status(error.status).json({
      message: error.message,
      details: error.details,
    });
  }

  return res.status(500).json({
    message: 'Something went wrong',
    details: error.toString(),
  });
}
