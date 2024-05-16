import { GetBoardData, GetTaskStruct } from '@/utils/utility_methods';
import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'
import Subtask from '@/models/Subtask';
import User from '@/models/User';

export async function POST(request) {
    await dbConnect()
    const data = await request.json();

    const user = await User.findById(data.author_id)
    if (user) {
        const task = await Task.findById(data.task_id)
        let subtask = new Subtask;
        subtask.task = data.task_id;
        subtask.board_id = task.board_id;
        subtask.name = data.name;
        subtask.done = false;
        await subtask.save();

        let boardData = await GetBoardData(task.board_id);
        let updatedTask = await GetTaskStruct(task)
                
        return (NextResponse.json({
            message: 'task created',
            updatedTask: updatedTask,
            boardData: boardData
        }, {status: 201}))
    }
    return (NextResponse.json({
        message: 'user not found'
    }, {status: 403}))
}