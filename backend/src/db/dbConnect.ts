import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}
const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DATABASE_NAME}`
    );

    if (!connectionInstance) {
      throw new Error("Failed to connect to MongoDB");
    }

    console.log(
      `Connected to Database: ${connectionInstance.connection.host}`
    );
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect