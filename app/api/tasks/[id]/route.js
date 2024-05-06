import dbConnect from '@/lib/dbConnect'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()
    
    const id = params.id

    Task.findByIdAndDelete(id)
}