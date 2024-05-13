import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Board from "@/models/Board";
import Access from "@/models/Access";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  await dbConnect();
  const user_id = params.user_id;
  const accessBoards = await Access.find({ user_id: user_id });
  let boards = [];
  for (let i = 0; i < accessBoards.length; i++) {
    const board = await Board.findOne({ _id: accessBoards[i].board_id });
    boards.push(board);
  }
  return NextResponse.json({ boards });
}

export async function POST(request, { params }) {
  await dbConnect();

  const user_id = params.user_id;
  const body = await request.json();

  const isRelationshipExist = await Access.find({
    user_id: user_id,
    board_id: body.board_id,
  });
  if (!isRelationshipExist) {

    let access = new Access();
    access.user_id = user_id;
    access.board_id = body.board_id;
    await access.save();

    return NextResponse.json({
      message: "Доска добавлена в список ваших досок",
    });
  }

  return NextResponse.json({
    message: "У вас есть доступ к данной доске",
  });
}
