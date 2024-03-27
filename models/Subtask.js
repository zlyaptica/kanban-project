import mongoose from "mongoose";
import {Schema} from "mongoose";

const subtaskSchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    name: String,
    done: Boolean
});

export default mongoose.models.Subtask || mongoose.model("Subtask", subtaskSchema);