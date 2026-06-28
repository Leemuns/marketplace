import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error(".env variable MONGODB_URI is undefined");

const PORT = process.env.PORT || "3001";

export default {
  MONGODB_URI,
  PORT,
};
