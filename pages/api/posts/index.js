import { connect, disconnect } from "mongoose";
import { Post, validatePost } from "../../../models/posts";
import { POST, GET, DB_OPTIONS, DB_URI } from "../../../configs/methods";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === GET) {
      const posts = await Post.find()
        .sort({ createdAt: "desc" })
        .populate("arthur", "-password -__v -createdAt -updatedAt -login", "User")
        .select({ __v: false });

      return res.status(200).json({ status: "success", data: posts });
    }

    if (method === POST) {
      const { error, value } = validatePost(req.body);
      if (error)
        return res.status(400).send({
          status: "error",
          message: error.details.map((d) => d.message.replaceAll(/\"/g, "")),
        });

      let post = new Post({ ...value });
      await post.save();
      post = await Post.findById(post._id)
        .populate("arthur", ["-password", "-__v", "-createdAt", "-updatedAt", "-login"], "User")
        .select({ __v: false, updatedAt: false });

      return res.status(201).json({
        status: "success",
        message: "Post created successfully",
        data: post,
      });
    }

    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("Post validation error");
      res.status(422).send({ status: "error", message: `${error.message}` });
    } else {
      res.status(500).send({ status: "internal server error", message: error });
    }
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
