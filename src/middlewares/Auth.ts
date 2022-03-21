import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
dotenv.config();

interface ProcessEnv {
  [key: string]: string
}
const { ACCESS_TOKEN_SECRET } = process.env as ProcessEnv
export class Middlewares {

  isAuth(req: Request<any, any, any, any, { token: string }>, res: Response, next: NextFunction): void {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1];  
    console.log('req.cookies', req.headers.cookie) 
    if(!token){
      return res.redirect('/admin/login')
    }
    return next();
    //   if (token && jwt.verify(token, ACCESS_TOKEN_SECRET)) {
    //     return next();
    //   }    
    // res.redirect('/admin/login');
  }
  isNotAuth(req: Request<any, any, any, any, { token: string }>, res: Response, next: NextFunction): void {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1];    
      if (!token) {
        return next();      
      }   
      // maybe need to return something 
  }

}


