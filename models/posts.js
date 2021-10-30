import { Schema, model, models } from "mongoose";
import { userSchema } from "./users";
import Joi from "joi";
import referrenceValidator from "mongoose-referrence-validator";

Joi.objectId = require("joi-objectid")(Joi);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 2,
    },
    excerpt: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
    arthur: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    coverImage: {
      type: String,
      max: 1000,
    },
    source: {
      type: String,
      max: 1000,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    __v: { select: false },
  },
  { timestamps: true }
);

postSchema.plugin(referrenceValidator);

export const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(255).trim(),
    content: Joi.string().min(2).required(),
    excerpt: Joi.string().required().trim().min(2).max(300),
    arthur: Joi.objectId().required(),
    coverImage: Joi.string().max(1000).uri(),
    source: Joi.string().max(1000).uri(),
    views: Joi.number().min(0).integer(),
  }).options({ abortEarly: false });

  return schema.validate(post);
};

export const validatePostPatch = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).trim(),
    content: Joi.string().min(2),
    excerpt: Joi.string().trim().min(2).max(300),
    coverImage: Joi.string()
      .max(1000)
      .uri()
      .message("coverImage must be a valid url")
      .allow("", null),
    source: Joi.string().max(1000).uri().message("coverImage must be a valid url").allow("", null),
  });

  return schema.validate(post);
};

export const Post = models.Post || model("Post", postSchema);
