import { connect, disconnect } from "mongoose";
import { Post } from "../../../models/posts";
import { POST, GET, DB_OPTIONS, DB_URI } from "../../../configs/methods";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === GET) {
      const posts = await Post.find()
        .sort({ createdAt: "desc" })
        .populate("arthur", ["-password", "-__v", "-createdAt", "-updatedAt"], "User")
        .select({ __v: false });

      return res.status(200).json({ status: "success", data: posts });
    }

    if (method === POST) {
      let post = new Post({ ...req.body });
      await post.save();
      post = await Post.findById(post._id)
        .populate("arthur", ["-password", "-__v", "-createdAt", "-updatedAt"], "User")
        .select({ __v: false, updatedAt: false });

      return res.status(201).json({
        status: "success",
        message: "Post created successfully",
        data: post,
      });
    }

    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    console.log(error);
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
