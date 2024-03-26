import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    let tasks = await Task.find()

    return (NextResponse.json(tasks))
}