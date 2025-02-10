import appAssert from "../../common/API/AppAssert";
import { NOT_FOUND, OK } from "../../constants/http";
import Session from "../../database/models/session.model";
import asyncHandler from "../../middlewares/asyncHandler.middleware";

export const getSessionsHandler = asyncHandler(async (req, res) => {
  const sessions = await Session.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 }, //descending newest first
    }
  );

  appAssert(sessions, NOT_FOUND, "Session not found");

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && {
        isCurrect: true,
      }),
    }))
  );
});

export const deleteSessionsHandler = asyncHandler(async (req, res) => {
  const session = await Session.findByIdAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  appAssert(session, NOT_FOUND, "session not Found or Already deleted");

  return res.status(OK).json({ message: "Session deleted successfully" });
});
