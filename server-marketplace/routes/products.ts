import express, { type Response } from "express";

import type { Product } from "../types.ts";
import ProductModel from "../models/product.ts";

const router = express.Router();

router.get("/", async (_req, res: Response<Product[]>) => {
  const data = await ProductModel.find({});
  res.json(data);
});

export default router;
