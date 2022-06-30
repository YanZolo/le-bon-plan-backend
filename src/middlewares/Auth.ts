import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
dotenv.config();

interface ProcessEnv {
  [key: string]: string;
}
const { ACCESS_TOKEN_SECRET } = process.env as ProcessEnv;
export class Middlewares {
  isAuth(
    req: Request<any, any, any, any, { token: string }>,
    res: Response,
    next: NextFunction
  ): void {
    const { token } = req.cookies;
    if (token && jwt.verify(token, ACCESS_TOKEN_SECRET)) {
      return next();
    }
    res.redirect('/'); // the path '/' redirect to login page (in index.ts)
  }
  isNotAuth(
    req: Request<any, any, any, any, { token: string }>,
    res: Response,
    next: NextFunction
  ): void {
    const { token } = req.cookies;
    if (!token) {
      return next();
    }
  }
}
