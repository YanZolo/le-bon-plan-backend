import { Response, Request, NextFunction } from 'express';

export class Middlewares {

  isAuth(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;
    if (token) {
      next();
    }
    res.redirect('/login');
  }

  
}
