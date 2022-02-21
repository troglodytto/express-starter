import { RequestHandler } from 'express';
import Joi from 'joi';
import AppError from '../utils/error';

export default function validate<T>(
  schema: Joi.ObjectSchema<T>,
  options?: Joi.ValidationOptions
): RequestHandler {
  return (req, res, next) => {
    const object = req.body;
    const { error } = schema.validate(object, options);
    if (error) {
      const response = new AppError(422, error.message);
      return next(response);
    }
    return next();
  };
}
