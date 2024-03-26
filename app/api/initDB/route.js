import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    await Task.deleteMany()
    let newTask = new Task
    newTask.name = 'Максим Канбан'
    newTask.description = 'Максим Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Илья БД'
    newTask.description = 'Илья Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Денис API'
    newTask.description = 'Денис Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Костя WEB Socket'
    newTask.description = 'Костя Сделать'
    await newTask.save()

    return (NextResponse.json({
        'message': 'данные заполнены'
    }))
}