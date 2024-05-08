import { GetBoardData } from '@/utils/GetBoardData';
import dbConnect from '@/lib/dbConnect';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function GET(request, {params}) {
    const board_id = params.board_id
    const statusTasks = await GetBoardData(board_id)

    return (NextResponse.json({statusTasks}))
}

export async function POST(request, {params}) {
    await dbConnect()
    const board_id = params.board_id
    const data = await request.json();
    
    let status = new Status;
    status.board_id = board_id;
    status.name = data.name;
    await status.save()

    let boardData = await GetBoardData(board_id);

    return (NextResponse.json({
        message: 'status created',
        status: status,
        boardData: boardData
    }))
}