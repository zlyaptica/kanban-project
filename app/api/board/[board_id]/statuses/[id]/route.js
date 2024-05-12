import { GetBoardData } from "@/utils/GetBoardData";
import dbConnect from "@/lib/dbConnect";
import Status from "@/models/Status";
import { NextResponse } from "next/server";
import Board from "@/models/Board";

export async function DELETE(request, { params }) {
  await dbConnect();
  const board_id = params.board_id;
  const status_id = params.id;
  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    await Status.findByIdAndDelete(status_id);
    const boardData = await GetBoardData(board_id);

    return NextResponse.json(
      {
        message: "status deleted",
        boardData: boardData,
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

  const requestBody = request.body;

  Status.findByIdAndUpdate(params.id, {
    name: requestBody.name,
    type: requestBody.type,
  });

  let updatedStatus = Status.findById(params.id);

  let boardData = await GetBoardData();

  return NextResponse.json({
    message: "status updated",
    status: updatedStatus,
    boardData: boardData,
  });
}