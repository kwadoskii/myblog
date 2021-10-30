import { isValidObjectId } from "mongoose";

export default function validateId(req, res) {
  if (!isValidObjectId(req.query.id)) return null;

  return req.query.id;
}
