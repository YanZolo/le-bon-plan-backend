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
  async handleRegister(req) {
    const {
      password,
      username,
      email
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword handleRegister ===> ', hashedPassword);
    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword
    });
    const newUser = await user.save();
    console.log('newUser saved ===> :', newUser);
    return {
      message: 'successfully registred',
      user: newUser.username
    };
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

    console.log('user handleLogin ===> ', user);

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user.email, ACCESS_TOKEN_SECRET);
      const refreshToken = jwt.sign(user.email, REFRESH_TOKEN_SECRET);
      console.log('accessToken handleLogin ===> ', accessToken);
      await UserModel.findOneAndUpdate({
        email
      }, {
        $addToSet: {
          refreshToken: refreshToken
        }
      });
      res.cookie('access_token', accessToken, {
        httpOnly: true
      }).redirect('/admin/users/all');
    }
  }

  handleLogout(res) {
    res.cookie('access_token', '', {
      maxAge: 0
    });
    return {
      message: 'successfully logged out'
    };
  }

}
//# sourceMappingURL=authController.js.map