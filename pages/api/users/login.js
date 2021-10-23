import { connect, disconnect } from "mongoose";
import { User } from "../../../models/users";
import { POST, DB_OPTIONS, DB_URI } from "../../../configs/methods";

export default async function post(req, res) {
  const { method } = req;

  try {
    await connect(DB_URI, DB_OPTIONS);
    console.log("db connected and running");

    if (method === POST) {
      const { password, username } = req.body;
      let user = await User.findOne({ username }).select({ __v: false });

      if (user?.password !== password || !user) {
        return res.status(200).json({
          status: "error",
          message: "Invalid username or password",
        });
      } else {
        return res.status(200).json({
          status: "success",
          data: {
            id: user._id,
            name: `${user.firstname} ${user.middlename} ${user.lastname}`,
            email: user.email,
          },
        });
      }
    }

    return res.status(404).json({ status: "error", message: "Http method not found!" });
  } catch (error) {
    console.log(error);
  } finally {
    disconnect().then(() => console.log("db disconnected"));
  }
}
