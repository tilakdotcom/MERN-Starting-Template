import { app } from "./app";
import { PORT as PORT_ } from "./constants/getEnv";
import dbConnect from "./database/db/dbConnect";

const PORT = PORT_ || 5000;

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT),
      () => {
        console.log(`Server is running on port ${PORT}`);
      };

    app.on("error", (error) => {
      console.error(`Error occurred`, error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });
