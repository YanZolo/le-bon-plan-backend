import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const {
  ACCESS_TOKEN_SECRET
} = process.env;
export class Middlewares {
  isAuth(req, res, next) {
    const {
      token
    } = req.cookies;

    if (token && jwt.verify(token, ACCESS_TOKEN_SECRET)) {
      return next();
    }

    res.redirect('/');
  }

  isNotAuth(req, res, next) {
    const {
      token
    } = req.cookies;

    if (!token) {
      return next();
    }
  }

}
//# sourceMappingURL=Auth.js.map