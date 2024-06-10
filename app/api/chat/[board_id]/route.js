import dbConnect from '@/lib/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    await dbConnect()
    let messages = await Message.aggregate([
        {
            $match: { $expr : { $eq: [ '$board' , { $toObjectId: params.board_id } ] } }
        },
        {
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
        { $sort: { date: 1 } },
        {
            $project: {
                _id: 1,
                text: 1,
                "authorData._id": 1,
                "authorData.name": 1,
                date: 1,
                board: 1
            }
        },

    ]);
    return (NextResponse.json(messages))
}