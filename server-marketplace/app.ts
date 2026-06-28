import express from "express";
import mongoose, { MongooseError } from "mongoose";

import productsRouter from "./routes/products.ts";
import logger from "./utils/logger.ts";
import config from "./utils/config.ts";

const app = express();

const connectMongoose = async () => {
  await mongoose.connect(config.MONGODB_URI, { family: 4 });
  logger.info("connected to MongoDB server");
};
connectMongoose().catch((err: MongooseError) =>
  logger.error("error connection to mongoDB: ", err.message),
);

app.use(express.json());

app.use("/api/products", productsRouter);

export default app;
