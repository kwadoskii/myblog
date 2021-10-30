import { connect, disconnect } from "mongoose";
import { User, validateUser } from "../../../models/users";
import { POST, GET, DB_OPTIONS, DB_URI } from "../../../configs/methods";
import bcrypt from "bcryptjs";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === GET) {
      const users = await User.find()
        .sort({ createdAt: "desc" })
        .select(["-__v", "-login", "-createdAt", "-updatedAt", "-password"]);

      return res.status(200).json({ status: "success", data: users });
    }

    if (method === POST) {
      // validate input
      const { error, value } = validateUser(req.body);
      if (error)
        return res.status(400).send({
          status: "error",
          message: error.details.map((d) => d.message.replaceAll(/\"/g, "")),
        });

      let user = new User({ ...value });

      const salt = await bcrypt.genSalt(11);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      user = await User.findById(user._id).select([
        "-__v",
        "-login",
        "-createdAt",
        "-updatedAt",
        "-password",
      ]);

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    }

    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("Post validation error");
      res.status(422).send({ status: "error", message: `${error.message}` });
    } else {
      console.log(error);
      res.status(500).send({ status: "internal server error", message: error.message });
    }
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
