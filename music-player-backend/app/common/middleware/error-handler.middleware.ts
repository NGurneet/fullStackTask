import { type ErrorRequestHandler } from "express";
import { type ErrorResponse } from "../helper/response.hepler";

/**
 * The global error handler middleware.
 *
 * This middleware function is called whenever an error occurs in the application.
 * It builds an error response and sends it back to the client.
 * The error response is in the format of {@link ErrorResponse}.
 *
 * @param {Error} err - The error object thrown by the application.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function to be called.
 *
 * @example
 * // Use the errorHandler middleware function in the application.
 * app.use(errorHandler);
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;
