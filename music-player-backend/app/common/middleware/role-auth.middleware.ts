import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import process from "process";
import { type IUser } from "../../user/user.dto";

/**
 * A middleware that checks if a user has a certain role.
 * @param {string[]} roles - The roles that are allowed to access the resource.
 * @param {string[]} publicRoutes - The routes that do not require authentication.
 * @returns {import('express').RequestHandler} - A middleware that checks the user role.
 */
export const roleAuth = (roles: IUser["role"], publicRoutes: string[] = []) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        next();
        return;
      }
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw createHttpError(401, {
          message: `Invalid token`,
        });
      }

      const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decodedUser as IUser;
      const user = req.user as IUser;
      const userId = req.user._id;
      if (user.role == null) {
        throw createHttpError(401, { message: "Invalid user role" });
      }
      if (!roles.includes(user.role)) {
        const type =
          user.role.slice(0, 1) + user.role.slice(1).toLocaleLowerCase();

        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }
      next();
    },
  );

/**
 * Extracts the user ID from the authorization token in the request headers.
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @throws {Error} - If the token is not provided or if it is invalid or expired.
 */
export const extractUserId = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw createHttpError(401, {
        message: "Token not provided",
      });
    }

    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decodedUser as IUser;

      // Attach the userObjectId (or user._id) to the request
      const userId = req.user._id;

      // Attach userId to the request object for downstream usage
      req.user._id = userId;

      next();
    } catch (err) {
      throw createHttpError(401, { message: "Invalid or expired token" });
    }
  },
);
