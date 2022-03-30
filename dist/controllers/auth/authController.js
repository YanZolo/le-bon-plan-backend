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
    console.log('handleLogin() req.body', req.body);
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

    console.log('user', user);

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({
        user
      }, ACCESS_TOKEN_SECRET, {
        expiresIn: '200s'
      });
      const refreshToken = jwt.sign({
        user
      }, REFRESH_TOKEN_SECRET);
      console.log('handleLogin() ==> access token ===>', accessToken);
      await UserModel.updateOne({
        email
      }, {
        $addToSet: {
          refreshToken: refreshToken
        }
      });
      req.app.set("username", user.username);
      res.cookie('access_token', accessToken, {
        httpOnly: true
      });
      console.log('=====');
      res.redirect('/profile');
      return res;
    }

    throw new Exception(401, 'Not autorized');
  }

  handleLogout(req, res) {
    res.cookie('access_token', '', {
      maxAge: 0
    });
    res.redirect('/login');
    return res;
  }

}
//# sourceMappingURL=authController.js.map