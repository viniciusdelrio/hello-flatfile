import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../common/errors/ValidationError';

function errorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    return response.status(400).send(err.message)
  }

  console.log(err)
  return response.status(500).send("Ooops! Something wrong happens :(.");
}

export default errorMiddleware