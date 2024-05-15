import { GetBoardData } from '@/utils/utility_methods';
import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    let tasks = await Task.find()

    let boardData = await GetBoardData()

    return (NextResponse.json({
        tasks: tasks,
        boardData: boardData
    }))
}

export async function POST(request) {
    await dbConnect()

    const requestBody = request.body;
    
    let task = new Task;
    task.board = requestBody.board;
    task.name = requestBody.name;
    task.priority = 0;
    task.description = requestBody.description;
    task.status = requestBody.status;
    task.doer = requestBody.user;
    await task.save();

    let boardData = await GetBoardData()

    return (NextResponse.json({
        message: 'task created',
        task: task,
        boardData: boardData
    }))
}