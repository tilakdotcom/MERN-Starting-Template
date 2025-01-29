import mongoose, { Document, Schema } from "mongoose";
import { verificationCode } from "../../common/enum/verificationCode";

interface VerifyCationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: verificationCode;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerifyCationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerifyCation = mongoose.model<VerifyCationDocument>(
  "VerifyCation",
  VerifyCationSchema,
);

export default VerifyCation;