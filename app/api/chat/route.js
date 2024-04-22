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
                _id: 0,
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
    console.log(newMessage)
    let kanban = await Board.findOne();
    console.log(kanban)
    let user = await User.findOne({ "name": newMessage.authorData.name })
    console.log(user)
    let message = new Message({
        "board": kanban._id,
        "author": user._id,
        "date": new Date(),
        "index": 4,
        "text": newMessage.text
    });

    await message.save();
    return (NextResponse.json({ status: 200 }))
}