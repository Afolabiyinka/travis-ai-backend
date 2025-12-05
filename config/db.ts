import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const CONNECTIONSTRING = process.env.CONNECTIONSTRING as string;

export const connectDb = async () => {
  try {
    await mongoose.connect(CONNECTIONSTRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};