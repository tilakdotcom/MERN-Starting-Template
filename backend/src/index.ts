import { app } from "./app";
import dbConnect from "./db/dbConnect";

const PORT = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    console.log("Database Connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });

    app.on("error", (error) => {
      console.error("Server Error", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });
