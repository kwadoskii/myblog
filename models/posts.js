import { Schema, model, models } from "mongoose";
import { userSchema } from "./users";

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
    },

    __v: { select: false },
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", postSchema);
