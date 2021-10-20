import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 2,
    },
    __v: { select: false },
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", postSchema);
