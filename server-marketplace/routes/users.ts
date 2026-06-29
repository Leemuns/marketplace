import express, { type Response, type Request } from "express";
import bcrypt from "bcrypt";

import type { UserCredentials, User } from "../types.ts";
import UserModel from "../models/user.ts";

const router = express.Router();

router.get("/", async (_req, res: Response<User[]>) => {
  const data = await UserModel.find({}).populate("orders.items.product", {
    name: 1,
    image: 1,
    priceCents: 1,
  });

  // trust me bro
  res.json(data as unknown as User[]);
});

router.post(
  "/",
  async (
    req: Request<unknown, unknown, UserCredentials>,
    res: Response<User>,
  ) => {
    const { username, password } = req.body;
    console.log("TEST", username, password);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({ username, passwordHash });
    const savedUser = await user.save();

    const userResponse: User = {
      id: savedUser._id.toString(),
      username: savedUser.username,
      passwordHash: savedUser.passwordHash,
      orders: [],
    };

    res.status(201).json(userResponse);
  },
);

export default router;
