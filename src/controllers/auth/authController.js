import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound';
dotenv.config();
export default class AuthController {
  // on register page
  async registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const user = new User({
        username,
        email,
        password
      });
      const newUser = await user.save();
      console.log('newUser :>> ', newUser);
      res.status(201).render('login'); // save new user and redirect to login page
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }

  // on login page

  async authenticateUser(req, res, next) {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      throw new UserNotFound();
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        console.log('accessToken :>> ', accessToken, 'user is authentified');
        res.render('profile'); // user has been authentified and he is redirected to his profile
      } else {
        res.status(401).json({ message: 'password incorrect' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    next();
  }

  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('authHeader : ', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      throw new Error('token not found');
    }
    console.log('access token secret : ', process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw new Error('token not valid');
      req.user = user;
    });
    next();
  }

  // async uptdateUser({ body: { username, email, password } }, { params: { id } }) {

  //   return await User.findOneAndUpdate(
  //     { _id: id },
  //     {
  //       username,
  //       email
  //     }
  //   );
  // }
}
