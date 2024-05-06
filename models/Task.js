import mongoose from "mongoose";
import {Schema} from "mongoose";

const taskSchema = new Schema({
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    doer: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    name: String,
    description: String,
    index: Number
});


export default mongoose.models.Task || mongoose.model("Task", taskSchema);