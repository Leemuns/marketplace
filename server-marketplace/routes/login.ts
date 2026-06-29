import express, { type Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/user.ts";
import type { UserCredentials } from "../types.ts";

const router = express.Router();

router.post(
  "/",
  async (req: Request<unknown, unknown, UserCredentials>, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const SECRET = process.env.SECRET;
    if (!SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const token = jwt.sign(userForToken, SECRET);

    return res
      .status(200)
      .send({ token, username: user.username, id: user.id });
  },
);

export default router;
