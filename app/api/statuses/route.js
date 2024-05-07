import { GetBoardData } from '@/app/utils/utils';
import dbConnect from '@/lib/dbConnect';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function GET(request) {
    return await GetBoardData()
}

export async function POST(request) {
    await dbConnect()

    const requestBody = request.body;
    
    let status = new Status;
    status.board = requestBody.board;
    status.name = requestBody.name;
    await status.save()

    let boardData = await GetBoardData();

    return (NextResponse.json({
        message: 'status created',
        status: status,
        boardData: boardData
    }))
}