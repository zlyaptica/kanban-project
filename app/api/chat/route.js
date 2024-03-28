import dbConnect from '@/lib/dbConnect'
import Chat from '@/models/chat'
import { NextResponse } from 'next/server'


export async function GET(request) {
    await dbConnect()
    let chats = await Chat.find({}).select('user text -_id');
    
    return (NextResponse.json(chats))
}
export async function POST(request, Response){
    const newMessage =await request.json();
    await dbConnect()
    console.log(newMessage)

    let chat = new Chat({
        "user": newMessage.user,
        "text": newMessage.text
    });

    await chat.save();
    return (NextResponse.json({status:200}))
}