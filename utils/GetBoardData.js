import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import Status from '@/models/Status';
import mongoose from 'mongoose';

export async function GetBoardData(board_id){
    await dbConnect()
    const boardID = new mongoose.Types.ObjectId(board_id)
    let statuses = await Status.find({"board_id": boardID})
    let statusTasks = []

    for (let i = 0; i < statuses.length; i++){
        let tasks = await Task.find({"status" : statuses[i]})

        const filledStatus = {
            _id: statuses[i]._id,
            board: statuses[i].board,
            name: statuses[i].name,
            tasks: tasks
        }

        statusTasks.push(filledStatus)
    }
    return statusTasks
}