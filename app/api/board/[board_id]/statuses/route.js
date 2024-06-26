import { GetBoardData } from "@/utils/utility_methods";
import dbConnect from "@/lib/dbConnect";
import Status from "@/models/Status";
import { NextResponse } from "next/server";
import Board from "@/models/Board";

export async function GET(request, { params }) {
  const board_id = params.board_id;
  const statusTasks = await GetBoardData(board_id);
  return NextResponse.json({ statusTasks });
}

export async function POST(request, { params }) {
  await dbConnect();
  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    let status = new Status();
    status.board_id = board_id;
    status.type = data.type;
    status.name = data.name;
    status.index = data.index;
    await status.save();

    let boardData = await GetBoardData(board_id);
    return NextResponse.json(
      {
        message: "status created",
        boardData: boardData,
      },
      { status: 201 }
    );
  }
  return NextResponse.json(
    {
      message: "you are not board creator",
    },
    { status: 403 }
  );
}

export async function DELETE(request, { params }) {
  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    // await Access.deleteMany({board_id:board_id})
  }

  return NextResponse.json({ message: "ok" });
}
