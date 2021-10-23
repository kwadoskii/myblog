import { DELETE, GET, PATCH, DB_OPTIONS, DB_URI } from "../../../configs/methods";
import { User } from "../../../models/users";
import { connect, disconnect } from "mongoose";
import validateId from "../../../middlewares/validateObjectIds";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    const id = validateId(req, res);
    let user = await User.findById(id).select({
      __v: false,
      password: false,
      createdAt: false,
      updatedAt: false,
    });

    if (!user) res.status(404).send({ status: "error", message: `User with id ${id} not found!` });

    if (method === GET) {
      return res.status(200).send({ status: "success", data: user });
    }

    if (method === PATCH) {
      const { username, email } = req.body;
      const userExists = await User.findOne({ $or: [{ username }, { email }] });

      if (userExists)
        return res
          .status(402)
          .send({ status: "error", message: "Username or email already exists" });

      const newUser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true }).select({
        __v: false,
        password: false,
      });

      return res
        .status(202)
        .send({ status: "success", message: `User with id ${id} updated.`, data: newUser });
    }

    if (method === DELETE) {
      await User.findByIdAndDelete(id);
      return res.status(202).send({ status: "success", message: `User with id ${id} deleted.` });
    }

    return res.status(404).send({ status: "error", message: "HTTP method not found" });
  } catch (error) {
    console.log(error);
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
