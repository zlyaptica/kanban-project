import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    let tasks = await Task.find()

    return (NextResponse.json(tasks))
}

export async function POST(request) {
    await dbConnect()

    const requestBody = request.body;
    
    let task = new Task;
    task.board = requestBody.board;
    task.name = requestBody.name;
    task.description = requestBody.description;
    task.status = requestBody.status;
    task.doer = requestBody.user;
    await task.save();

    return (NextResponse.json({
        message: 'task created',
        task: task
    }))
}