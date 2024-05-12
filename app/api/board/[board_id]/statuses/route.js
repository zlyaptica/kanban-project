import { GetBoardData } from "@/utils/GetBoardData";
import dbConnect from "@/lib/dbConnect";
import Status from "@/models/Status";
import { NextResponse } from "next/server";
import Board from "@/models/Board";
import Access from "@/models/Access";

export async function GET(request, { params }) {
  const board_id = params.board_id;
  const board = await Board.findOne({ _id: board_id });
  const statusTasks = await GetBoardData(board_id);

  return NextResponse.json({ statusTasks: statusTasks, board: board });
}

export async function POST(request, { params }) {
  await dbConnect();

  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    await Board.findByIdAndUpdate({ _id: board_id }, { name: data.name });
    const updatedBoard = await Board.findById({ _id: board_id });
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

export async function DELETE(request, { params }) {
  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    // await Access.deleteMany({board_id:board_id})
  }

  return NextResponse.json({ message: "ok" });
}