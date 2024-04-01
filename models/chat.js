import mongoose from "mongoose";
import {Schema} from "mongoose"

const chatSchema = new Schema({
    user: String,
    text: String
})

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema)