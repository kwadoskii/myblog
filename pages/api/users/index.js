import { connect, disconnect } from "mongoose";
import { User } from "../../../models/users";
import { POST, GET, DB_OPTIONS, DB_URI } from "../../../configs/methods";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === GET) {
      const users = await User.find().sort({ createdAt: "desc" }).select({ __v: false });
      return res.status(200).json({ status: "success", data: users });
    }

    if (method === POST) {
      let user = new User({ ...req.body });
      await user.save();
      user = await User.findById(user._id).select({ __v: false, password: false });

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    }

    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    console.log(error);
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
