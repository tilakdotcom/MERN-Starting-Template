import { ApiResponse } from "@/utils/ApiResponse";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  res.json(
    new ApiResponse({
      statusCode: 200,
      message: "User registered successfully",
    })
  );
};
