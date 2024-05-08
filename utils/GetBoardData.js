import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import Status from '@/models/Status';
import User from "@/models/User";
import mongoose from 'mongoose';

export async function GetBoardData(board_id){
    await dbConnect()
    const boardID = new mongoose.Types.ObjectId(board_id)
    let statuses = await Status.find({"board_id": boardID})
    let statusTasks = []

    for (let i = 0; i < statuses.length; i++){
        let tasks = await Task.find({"status" : statuses[i]})
        let tasksData = []
        tasks.forEach(async (task) => {
          const doer = await User.findById(task.doer)
          const taskData = {
            task: task,
            doerData: {
              _id: doer._id,
              name: doer.name,
              email: doer.email
            }
          }
          tasksData.push(taskData)
        });

        const filledStatus = {
            _id: statuses[i]._id,
            board: statuses[i].board,
            name: statuses[i].name,
            tasks: tasksData
        }

        statusTasks.push(filledStatus)
    }
    return statusTasks
}
