import mongoose, { Document, Schema } from "mongoose";
import { passwordCompare, passwordHasher } from "../../common/utils/bcryptjs";

export interface userDocument extends Document {
  user: string;
  email: string;
  password: string;
  verifiedEmail: boolean;
  avatar?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  publicUser(): Pick<
    userDocument,
    | "user"
    | "email"
    | "verifiedEmail"
    | "comparePassword"
    | "createAt"
    | "updatedAt"
  >;
  createAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<userDocument>(
  {
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await passwordHasher(this.password);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await passwordCompare(candidatePassword, this.password);
};

userSchema.methods.publicUser = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model<userDocument>("User", userSchema);

export default User;
