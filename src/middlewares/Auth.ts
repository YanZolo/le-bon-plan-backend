import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import userModel from '../models/userModel.js';
export class AuthMiddlewares {

  isAuth(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;
    if (token) {
      next();
    }
    res.redirect('/login');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { password, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    try {
      const newUser = await user.save();
      console.log('newUser saved :', newUser)
      res.status(201).redirect('/user/login')
    } catch (error: any) {
      res.json({ message: error.message })
    }
  }
}
