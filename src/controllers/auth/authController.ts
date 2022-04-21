import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound';
dotenv.config();

interface ProcessEnv {
  [key: string]: string;
}
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env as ProcessEnv;

export default class AuthController {
  // on register page

  async handleRegister(
    req: Request<
      any,
      any,
      { password: string; username: string; email: string }
    >,
    res: Response
  ) {
    const { password, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    try {
      const newUser = await user.save();
      console.log('newUser saved :', newUser);
      res.status(201).redirect('/user/login');
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async handleLogin(
    req: Request<any, any, { email: string; password: string }>,
    res: Response
  ) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UserNotFound();
    }
    try {
      console.log('user', user);
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
          expiresIn: '7d'
        }); // fixed secret type error with inteface ProcessEnv
        const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
        await UserModel.updateOne(
          { email },
          { $addToSet: { refreshToken: refreshToken } }
        );
        res
          .cookie('access_token', accessToken)
          .status(200)
          .redirect('/user/profile');
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  handleLogout(res: Response) {
    res.cookie('access_token', '').redirect('/user/login'); // maybe req.cookie
  }
}
