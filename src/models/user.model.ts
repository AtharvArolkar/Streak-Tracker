import mongoose, { Schema } from "mongoose";

import { User } from "@/types/user";

const UserSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: false,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required."],
      match: [/\d{10}/, "Please enter a valid phone number."],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
