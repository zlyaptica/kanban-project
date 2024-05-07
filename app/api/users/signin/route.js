import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function POST(request) {
    await dbConnect()

    const requestBody = request.body;

    let enteredEmail = requestBody.email
    User.find({email : enteredEmail}, (err, match) => {
        if (err) {
            return (NextResponse.json({
                message: 'user not found'
            }))
        }
        else {
            let matchPassword = match.password
            if (matchPassword == requestBody.password) {
                return (NextResponse.json({
                    message: 'successful sign in',
                    user: match
                }))
            }
            else {
                return (NextResponse.json({
                    message: 'wrong password'
                }))
            }
        }
    })
}
