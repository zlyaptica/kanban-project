import mongoose from "mongoose";
import {Schema} from "mongoose"

const boardSchema = new Schema({
    name: String,
    description: String
})

export default mongoose.models.Board || mongoose.model("Board", boardSchema)