import dbConnect from "@/lib/dbConnect";
import Access from "@/models/Access";
import Board from "@/models/Board";
import Status from "@/models/Status";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  await dbConnect();
  const board_id = params.board_id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    if (!data.empty_board) {
      await Status.deleteMany({ board_id: board_id });
      await Task.deleteMany({ board_id: board_id });
      await Subtask.deleteMany({ board_id: board_id });
    }
    await Board.findByIdAndDelete(board_id);
    await Access.deleteMany({ board_id: board_id });

    return NextResponse.json(
      {
        message: "board delete",
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json(
    {
      message: "you are not board creator",
    },
    { status: 403 }
  );
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