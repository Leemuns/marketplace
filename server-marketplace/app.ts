import express from "express";
import mongoose, { MongooseError } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.ts";
import usersRouter from "./routes/users.ts";
import loginRouter from "./routes/login.ts";
import logger from "./utils/logger.ts";
import config from "./utils/config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client-marketplace/dist")));
  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client-marketplace/dist/index.html"));
  });
}

export default app;
