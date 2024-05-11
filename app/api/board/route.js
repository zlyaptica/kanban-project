import dbConnect from "@/lib/dbConnect";
import Access from "@/models/Access";
import Board from "@/models/Board";
import { NextResponse } from "next/server";

export async function POST(request, {params}) {
    await dbConnect()

    const body = await request.json()
    console.log("body", body)

    let board = new Board();
    board.name = body.name;
    board.author = body.author_id;
    board.description = body.description;
    const insertedboard = await board.save();
    
    let access = new Access()
    access.user_id = body.author_id;
    access.board_id = insertedboard._id;
    await access.save();

    const accessBoards = await Access.find({ user_id: body.author_id });
    let boards = [];
    for (let i = 0; i < accessBoards.length; i++) {
      const board = await Board.findOne({ _id: accessBoards[i].board_id });
      boards.push(board);
    }

    console.log("boards", boards)

    return (NextResponse.json({
        boards
    }))
}