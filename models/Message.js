import mongoose from "mongoose";
import {Schema} from "mongoose";

const messageSchema = new Schema({
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    index: Number,
    text: Text
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);