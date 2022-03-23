import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
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
      email
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    const newUser = await user.save();
    console.log('newUser saved :', newUser);
    res.redirect('/auth/login');
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

    console.log('user', user);

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({
        user
      }, ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
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
      res.cookie('access_token', accessToken).send('logged').redirect('/admin/profile');
    }
  }

  handleLogout(res) {
    res.cookie('access_token', '').redirect('/auth/login');
  }

}
//# sourceMappingURL=authController.js.map