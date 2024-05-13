import { GetBoardData, GetStatusData } from "@/utils/utility_methods";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import Status from "@/models/Status";
import Board from "@/models/Board";

export async function POST(request, { params }) {
  await dbConnect();

  const board_id = params.board_id;
  const status_id = params.id;

  const data = await request.json();

  const board = await Board.findOne({ _id: board_id });

  if (board.author == data.author_id) {
    let task = new Task();
    task.board_id = board_id;
    task.name = data.name;
    task.status = status_id;
    task.index = data.index;
    task.is_completed = data.is_completed;
    task.priority = data.priority;
    await task.save();
  
    let updatedStatus = await Status.findById(params.id); 
    let statusData = await GetStatusData(updatedStatus)
  
    return NextResponse.json({
      message: "task updated",
      statusData: statusData,
    }, {status: 201});
  }

  return NextResponse.json({
    message: "вы не создатель доски"
  }, {status: 403});
}