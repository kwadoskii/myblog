import { Schema, model, models } from "mongoose";
import Joi from "joi";

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
      minlength: 5,
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
    login: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
      lastLogin: {
        type: Date,
      },
      select: false,
    },

    __v: { select: false },
  },
  { timestamps: true }
);

export const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required().max(255).label("username").lowercase().trim(),
    email: Joi.string().email().required().max(255).min(5).label("email"),
    firstname: Joi.string().min(2).max(255).required().label("firstname").trim(),
    middlename: Joi.string().min(2).max(255).trim(),
    lastname: Joi.string().min(2).max(255).required().trim(),
    password: Joi.string().min(2).max(1024).required(),
    login: Joi.object({
      count: Joi.number().min(0).integer(),
      lastLogin: Joi.date(),
    }),
  }).options({ abortEarly: false });

  return schema.validate(user);
};

export const validateUserPatch = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).label("username").lowercase().trim(),
    email: Joi.string().email().max(255).min(5).label("email"),
    firstname: Joi.string().min(2).max(255).label("firstname").trim(),
    middlename: Joi.string().min(2).max(255).trim(),
    lastname: Joi.string().min(2).max(255).trim(),
    password: Joi.string().min(2).max(1024),
  });

  return schema.validate(user);
};

export const User = models.User || model("User", userSchema);
