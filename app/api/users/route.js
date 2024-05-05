import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function POST(request) {
    await dbConnect()

    const requestBody = request.body;

    let user = new User;
    user.name = requestBody.name;
    user.email = requestBody.email;
    user.password = requestBody.password;
    await user.save();

    return (NextResponse.json({
        message: 'user created',
        user
    }))
}
