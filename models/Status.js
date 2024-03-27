import mongoose from "mongoose";
import {Schema} from "mongoose";

const statusSchema = new Schema({
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    name: String
});

export default mongoose.models.Status || mongoose.model("Status", statusSchema);