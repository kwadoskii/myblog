import { DELETE, GET, PATCH, DB_OPTIONS, DB_URI } from "../../../configs/methods";
import { User, validateUserPatch } from "../../../models/users";
import { connect, disconnect } from "mongoose";
import validateId from "../../../middlewares/validateObjectIds";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("users\\:id db connected and running");

    const id = validateId(req, res);
    if (id === null) return res.status(404).json({ status: "error", message: "Invalid id" });

    let user = await User.findById(id).select(["-__v", "-createdAt", "-updatedAt", "-password"]);

    if (!user) res.status(404).send({ status: "error", message: `User with id ${id} not found!` });

    if (method === GET) {
      return res.status(200).send({ status: "success", data: user });
    }

    if (method === PATCH) {
      // validate entries
      const { error, value } = validateUserPatch(req.body);

      if (error)
        return res
          .status(422)
          .send({ status: "error", message: error.details[0].message.replaceAll(/\"/g, "") });

      const { username, email } = value;
      const userExists = await User.findOne({ $or: [{ username }, { email }] });

      if (userExists)
        return res
          .status(402)
          .send({ status: "error", message: "Username or email already exists" });

      const salt = await bcrypt.genSalt(11);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      delete req.body.password;

      const userToPatch = await User.findByIdAndUpdate(
        id,
        { ...req.body, password: hashPassword },
        { new: true }
      ).select(["-__v", "-login", "-createdAt", "-updatedAt", "-password"]);

      return res
        .status(202)
        .send({ status: "success", message: `User with id ${id} updated.`, data: userToPatch });
    }

    if (method === DELETE) {
      await User.findByIdAndDelete(id);
      return res.status(202).send({ status: "success", message: `User with id ${id} deleted.` });
    }

    return res.status(404).send({ status: "error", message: "HTTP method not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: error.name });
  } finally {
    disconnect().then(() => console.log("users\\:id db disconnected"));
  }
}
