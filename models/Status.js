import mongoose from "mongoose";
import { Schema } from "mongoose";

const statusSchema = new Schema({
  board_id: { type: Schema.Types.ObjectId, ref: "Board" },
  name: String,
  type: String,
  index: Number,
});

export default mongoose.models.Status || mongoose.model("Status", statusSchema);
