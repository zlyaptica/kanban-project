import mongoose from "mongoose";
import {Schema} from "mongoose"

const taskSchema = new Schema({
    name: String,
    description: String
})

export default mongoose.models.Task || mongoose.model("Task", taskSchema)