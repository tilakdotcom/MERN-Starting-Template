import dotEnv from "dotenv";
dotEnv.config({
  path: "./.env",
});
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./constants/getEnv";
import errorHandler from "./middlewares/errorHandler.middleware";
const app: Express = express();

//middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors middleware
const corsOptions: cors.CorsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

//cookie middleware
app.use(cookieParser());

// import routes and declaratio
import healthRoutes from "./core/routes/health.routes";
import authRoutes from "./core/routes/auth.routes";
import userRoutes from "./core/routes/user.routes";
import sessionRoutes from "./core/routes/session.routes";

//  use routes
app.use("/api/v1/heath", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/session", sessionRoutes);


app.use(errorHandler);

export { app };
