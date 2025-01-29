import asyncHandler from "../../middlewares/asyncHandler.middleware";

export const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
