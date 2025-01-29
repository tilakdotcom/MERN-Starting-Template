import mongoose from "mongoose";
import { DATABASE_NAME, MONGO_URI } from "../../constants/getEnv";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGO_URI}/${DATABASE_NAME}`
    );
    if (!connectionInstance) {
      throw new Error("Failed to connect to MongoDB");
    }
    console.log(
      `database connected host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};


export default dbConnect;