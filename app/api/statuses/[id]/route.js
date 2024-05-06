import dbConnect from '@/lib/dbConnect';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()

    Status.findByIdAndDelete(params.id)
}

export async function POST(request, {params}) {
    await dbConnect()

    const requestBody = request.body
    
    Status.findByIdAndUpdate(params.id, {name : requestBody.name, type : requestBody.type})

    let updatedStatus = Status.findById(params.id)

    return (NextResponse.json({
        message: 'status updated',
        status: updatedStatus
    }))
}