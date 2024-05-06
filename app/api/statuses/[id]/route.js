import dbConnect from '@/lib/dbConnect';
import Status from '@/models/Status';
import { NextResponse } from 'next/server'

export async function DELETE(request, {params}) {
    await dbConnect()

    Status.findByIdAndDelete(params.id)
}