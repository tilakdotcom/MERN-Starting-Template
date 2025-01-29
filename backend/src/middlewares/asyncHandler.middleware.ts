import { NextFunction, Request, Response } from "express";



type AsyncHandler =(
  req:Request,
  res:Response,
  next:NextFunction
)=> Promise<any>

const asyncHandler =(controller:AsyncHandler):AsyncHandler =>{
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
} 


export default asyncHandler;