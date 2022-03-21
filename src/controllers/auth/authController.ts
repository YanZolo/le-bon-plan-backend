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

  async handleRegister(req: Request) {
    const { password, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword handleRegister ===> ', hashedPassword)
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    const newUser = await user.save();
    console.log('newUser saved ===> :', newUser)

    return { message: 'successfully registred', user: newUser.username }
  }

  async handleLogin(req: Request<any, any, { email: string, password: string }>, res: Response): Promise<any> {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new UserNotFound()
    }

    console.log('user handleLogin ===> ', user)
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user.email, ACCESS_TOKEN_SECRET) // fixed secret type error with inteface ProcessEnv
      const refreshToken = jwt.sign(user.email, REFRESH_TOKEN_SECRET)
      console.log('accessToken handleLogin ===> ', accessToken)     
      await UserModel.findOneAndUpdate({ email }, { $addToSet: { refreshToken: refreshToken } })
      res.cookie('access_token', accessToken, {httpOnly:true})
      .redirect('/admin/users/all')
      // .redirect('/admin/profile')

      // return { message: 'successfully logged', user: loggedUser }
    }
  }

  handleLogout(res: Response) {
    res.cookie('access_token', '', {maxAge: 0}) // maybe req.cookie
    return { message: 'successfully logged out' }
  }

}
