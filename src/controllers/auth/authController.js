import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
export default class AuthController {
  async registerUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch {
      res.status(500).send();
    }
  }

  async authenticateUser(req, res, next) {
    const user = await User.findOne({ name: req.body.name });
    if (user == null)
      return res.status(404).json({ message: "user does not exist" });

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          user.name,
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken: accessToken });
      } else {
        res.status(401).json({ message: "password incorrect" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    next();
  }

  async authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("authHeader : ", authHeader);
    if (token == null) return res.sendStatus(401);
    console.log("access token secret : ", process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
    });
    next();
  }

  async uptdateUser({ body: { username, email } }, { params: { id } }) {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        username,
        email,
      }
    );
  }
}
