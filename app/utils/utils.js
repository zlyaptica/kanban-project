import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import Status from '@/models/Status';
import User from '@/models/User';

export async function GetBoardData(){
    await dbConnect()
    let statuses = await Status.find()
    let statusWithTasks = []

    for (let i = 0; i < statuses.length; i++){
        let tasks = await Task.find({"status" : statuses[i]})

        tasks.forEach(task => {
            let doer = User.findById(task.doer)
            task.doer = doer.name
        });

        const filledStatus = {
            _id: statuses[i]._id,
            board: statuses[i].board,
            name: statuses[i].name,
            tasks: tasks
        }

        statusWithTasks.push(filledStatus)
    }

    return statusWithTasks
}