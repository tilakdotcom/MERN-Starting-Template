import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import ApiError from "../common/API/ApiError";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  const errorMessage = errors.map((err) => {
    return `${err.path} : ${err.message}`;
  });

  return res.status(BAD_REQUEST).json({
    message: errorMessage.join(", "),
    errors,
  });
};

const handleApiError = (res: Response, error: ApiError) => {
  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Error occured PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }
  if (error instanceof ApiError) {
    handleApiError(res, error);
  }
  res.status(INTERNAL_SERVER_ERROR).json({
    statusCode: INTERNAL_SERVER_ERROR,
    message: "Error occured",
    error,
  });

  next();
};

export default errorHandler;
