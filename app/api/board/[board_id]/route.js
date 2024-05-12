import dbConnect from "@/lib/dbConnect";
import Board from "@/models/Board";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  await dbConnect();

  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    await Board.findByIdAndUpdate({ _id: board_id }, { name: data.name });
    const updatedBoard = await Board.findById({ _id: board_id });
    console.log(updatedBoard);
    return NextResponse.json(
      {
        updatedBoard,
      },
      { status: 200 }
    );
  }
  return NextResponse.json(
    {
      message: "you are not board creator",
    },
    { status: 403 }
  );
}