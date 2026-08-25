import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDB() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MongoDB URL is missing");
    }
    await mongoose.connect(process.env.MONGODB_URL ?? "");

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
}
