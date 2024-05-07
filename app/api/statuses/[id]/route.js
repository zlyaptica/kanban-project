import { GetBoardData } from '@/app/utils/utils';
import dbConnect from '@/lib/dbConnect';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()

    Status.findByIdAndDelete(params.id)

    let boardData = await GetBoardData()

    return (NextResponse.json({
        message: 'status deleted',
        boardData: boardData
    }))
}

export async function POST(request, {params}) {
    await dbConnect()

    const requestBody = request.body
    
    Status.findByIdAndUpdate(params.id, {name : requestBody.name, type : requestBody.type})

    let updatedStatus = Status.findById(params.id)

    let boardData = await GetBoardData()

    return (NextResponse.json({
        message: 'status updated',
        status: updatedStatus,
        boardData: boardData
    }))
}