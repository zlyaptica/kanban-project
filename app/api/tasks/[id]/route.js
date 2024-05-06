import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()

    Task.findByIdAndDelete(params.id)
}

export async function POST(request, {params}) {
    await dbConnect()

    const requestBody = request.body;
    
    Task.findByIdAndUpdate(params.id, {index : requestBody.index})

    let updatedTask = Task.findById(params.id)

    return (NextResponse.json({
        message: 'task updated',
        task: updatedTask
    }))
}