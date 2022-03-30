import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
import Exception from '../../errors/Exception.js';
dotenv.config();
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} = process.env;
export default class AuthController {
  async handleRegister(req, res) {
    const {
      password,
      username,
      email,
      isAdmin
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword);
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin
    });
    const newUser = await user.save();
    console.log('newUser saved :', newUser);
    res.redirect('/login');
    return res;
  }

  async handleLogin(req, res) {
    const {
      email,
      password
    } = req.body;
    const user = await UserModel.findOne({
      email
    });

    if (!user) {
      throw new UserNotFound();
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({
        user
      }, ACCESS_TOKEN_SECRET, {
        expiresIn: '200s'
      });
      res.app.locals = {
        user: user.username
      };
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000000
      });
      console.log('=====');
      res.redirect('/profile');
      return res;
    }

    throw new Exception(401, 'Not autorized');
  }

  handleLogout(req, res) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      maxAge: 0
    });
    res.redirect('/login');
    console.log('handleLogout() req.headers', req.headers);
    return res;
  }

}
//# sourceMappingURL=authController.js.map