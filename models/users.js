import { Schema, model, models } from "mongoose";

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
      maxlength: 255,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    middlename: {
      type: String,
      minlength: 2,
      maxlength: 255,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    __v: { select: false },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
