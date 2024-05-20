import { GetBoardData, GetStatusData } from "@/utils/utility_methods";
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

  const data = await request.json();

  if (data.field == "type") {
    await Status.updateOne({ _id: params.id }, { type: data.type });
  }

  if (data.field == "name") {
    await Status.updateOne({ _id: params.id }, { name: data.name });
  }

  if (data.field == "index") {
    let startIndex, endIndex;

    if (data.setIndex > data.currentStatusIndex) {
      startIndex = data.currentStatusIndex + 1;
      endIndex = data.setIndex;

      for (let i = startIndex; i <= endIndex; i++) {
        await Status.findOneAndUpdate(
          { board_id: params.board_id, index: i },
          { index: i - 1 }
        );
      }
    } else {
      startIndex = data.currentStatusIndex - 1;
      endIndex = data.setIndex;

      for (let i = startIndex; i >= endIndex; i--) {
        await Status.findOneAndUpdate(
          { board_id: params.board_id, index: i },
          { index: i + 1 }
        );
      }
    }
    await Status.findByIdAndUpdate(params.id, {
      index: data.setIndex,
    });
  }

  let updatedStatus = await Status.findById(params.id);
  let statusData = await GetStatusData(updatedStatus);

  let boardData = await GetBoardData(params.board_id);

  return NextResponse.json({
    message: "status updated",
    status: statusData,
    boardData: boardData,
  });
}
