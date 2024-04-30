import dbConnect from '@/lib/dbConnect'
import Message from '@/models/Message'
import User from '@/models/User';
import Board from '@/models/Board'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    let messages = await Message.aggregate(
        [{
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'authorData'
            },
        },
        {
            $unwind: "$authorData",
        },
        {$sort: {date: 1}},
        {
            $project: {
                _id: 1,
                text: 1,
                "authorData.name": 1,
                date: 1
            }
        },
        
        ]);
    return (NextResponse.json(messages))
}
export async function POST(request, Response) {
    const newMessage = await request.json();
    await dbConnect()
    let kanban = await Board.findOne();
    let user = await User.findOne({ "name": newMessage.authorData.name })
    let message = new Message({
        "board": kanban._id,
        "author": user._id,
        "date": new Date(),
        "index": 4,
        "text": newMessage.text
    });
    let resultMessage
    await message.save().then(result=>{resultMessage = result});
    let messageID= String(resultMessage._id)
    console.log(messageID)

    return (NextResponse.json({ status: 200, messageID}))
}