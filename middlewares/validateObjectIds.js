import { isValidObjectId } from "mongoose";

export default function validateId(req, res) {
  if (!isValidObjectId(req.query.id))
    return res.status(404).json({ status: "error", message: "Invalid id" });

  return req.query.id;
}
