import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
dotenv.config();

interface ProcessEnv {
  [key: string]: string
}
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env as ProcessEnv

export default class AuthController {
  // on register page

  async handleRegister(req: Request, res: Response) {
    const { password, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    const newUser = await user.save();
    console.log('newUser saved :', newUser)
    res.redirect('/auth/login')
  }

  async handleLogin(req: Request<any, any, { email: string, password: string }>, res: Response) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('-refreshToken').lean()
    if (!user) {
      throw new UserNotFound()
    }

    console.log('user', user)
    if (await bcrypt.compare(password, user.password)) {
      console.log('if statement bcrypt')

      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' }) // fixed secret type error with inteface ProcessEnv
      const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET)
      await UserModel.updateOne({ email }, { $addToSet: { refreshToken: refreshToken } })
      return res.cookie('access_token', accessToken).send('logged')
      
      // .redirect('/admin/profile')     
    }
  }

  handleLogout(res: Response) {
    res.cookie('access_token', '').redirect('/auth/login') // maybe req.cookie
  }

}
