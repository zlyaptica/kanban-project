import { GetBoardData } from '@/app/utils/utils'
import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()

    Task.findByIdAndDelete(params.id)

    let boardData = await GetBoardData()

    return (NextResponse.json({
        message: 'task deleted',
        boardData: boardData
    }))
}

export async function POST(request, {params}) {
    await dbConnect()

    const requestBody = request.body;
    
    Task.findByIdAndUpdate(params.id, {index : requestBody.index})

    let updatedTask = Task.findById(params.id)

    let boardData = await GetBoardData()

    return (NextResponse.json({
        message: 'task updated',
        task: updatedTask,
        boardData: boardData
    }))
}