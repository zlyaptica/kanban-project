import mongoose from "mongoose";
import { Schema } from "mongoose";

const accessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  board_id: { type: Schema.Types.ObjectId, ref: "Board" },
});
export default mongoose.models.Access || mongoose.model("Access", accessSchema);
