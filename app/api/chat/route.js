import dbConnect from '@/lib/dbConnect'
import Message from '@/models/Message'
import User from '@/models/User';
import Board from '@/models/Board'
import { NextResponse } from 'next/server'


export async function PUT(request, Response) {
    const newMessage = await request.json();
    await dbConnect()
    let message = new Message({
        "board": newMessage.board,
        "author": newMessage.authorData._id,
        "date": new Date(),
        "text": newMessage.text
    });
    let resultMessage
    await message.save().then(result => { resultMessage = result });
    let messageID = String(resultMessage._id)
    console.log(messageID)
    return (NextResponse.json({ status: 200, messageID }))
}
export async function DELETE(request, Response) {
    const delMessage = await request.json()
    await dbConnect()
    await Message.deleteOne({ _id: delMessage._id })
    return (NextResponse.json({ status: 200 }))
}

export async function PATCH(request, Response) {
    const updateMessage = await request.json()
    await dbConnect()
    await Message.findOneAndUpdate({ _id: updateMessage._id }, { text: updateMessage.text })
    return (NextResponse.json({ status: 200 }))
}