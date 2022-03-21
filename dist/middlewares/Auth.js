import dotenv from 'dotenv';
dotenv.config();
const {
  ACCESS_TOKEN_SECRET
} = process.env;
export class Middlewares {
  isAuth(req, res, next) {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1];
    console.log('req.cookies', req.headers.cookie);

    if (!token) {
      return res.redirect('/admin/login');
    }

    return next();
  }

  isNotAuth(req, res, next) {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1];

    if (!token) {
      return next();
    }
  }

}
//# sourceMappingURL=Auth.js.map