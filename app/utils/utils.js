import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function GetBoardData(){
    await dbConnect()
    let statuses = await Status.find()
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

    //return (NextResponse.json({statusTasks}))
    return statusTasks
}