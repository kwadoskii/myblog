import { connect, disconnect } from "mongoose";
import { User } from "../../../models/users";
import { POST, DB_OPTIONS, DB_URI } from "../../../configs/methods";
import bcrypt from "bcryptjs";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === POST) {
      const { password, username } = req.body;
      let user = await User.findOne({ username }).select({ __v: false });
      if (!user)
        return res.status(200).json({ status: "error", message: "Invalid username or password" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(200).json({ status: "error", message: "Invalid username and password" });

      await User.findOneAndUpdate(
        { username },
        { $inc: { ["login.count"]: 1 }, $set: { "login.lastLogin": new Date() } }
      );

      return res.status(200).json({
        status: "success",
        data: {
          id: user._id,
          name: `${user.firstname}${user.middlename ? " " + user.middlename + " " : " "}${
            user.lastname
          }`,
          email: user.email,
        },
      });
    }
    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", name: error.name, message: error.message });
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
