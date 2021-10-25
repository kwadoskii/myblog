import { DELETE, GET, PATCH, DB_OPTIONS, DB_URI } from "../../../configs/methods";
import { Post } from "../../../models/posts";
import { connect, disconnect } from "mongoose";
import validateId from "../../../middlewares/validateObjectIds";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    const id = validateId(req, res);
    let post = await Post.findById(id)
      .populate("arthur", ["-password", "-__v", "-createdAt", "-updatedAt"], "User")
      .select(["-__v", "-updatedAt"]);

    if (!post) res.status(404).send({ status: "error", message: `Post with id ${id} not found!` });

    if (method === GET) {
      await Post.findByIdAndUpdate(id, { $inc: { views: 1 } });

      return res.status(200).send({ status: "success", data: post });
    }

    if (method === PATCH) {
      const newPost = await Post.findByIdAndUpdate(
        id,
        { content: req.body.content },
        { new: true }
      ).select({ __v: false });
      return res
        .status(202)
        .send({ status: "success", message: `Post with id ${id} updated.`, data: newPost });
    }

    if (method === DELETE) {
      await Post.findByIdAndDelete(id);
      return res.status(202).send({ status: "success", message: `Post with id ${id} deleted.` });
    }
  } catch (error) {
    console.log(error);
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
