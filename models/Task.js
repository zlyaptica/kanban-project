import mongoose from "mongoose";
import {Schema} from "mongoose";

const taskSchema = new Schema({
    board_id: { type: Schema.Types.ObjectId, ref: 'Board' },
    doer: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    name: String,
    index: Number,
    priority: Number,
    is_completed: Boolean,
    description: String,
    done: Boolean,
    creationDate: Date,
    startDate: Date,
    deadLineDate: Date
});


export default mongoose.models.Task || mongoose.model("Task", taskSchema);