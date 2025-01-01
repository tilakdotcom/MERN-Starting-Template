import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";





const health = asyncHandler(async ( req:Request, res:Response)=>{
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Server is up and running",
      
    })
  )
})

export default health;