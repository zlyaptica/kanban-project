import { GetBoardData, GetStatusData } from "@/utils/utility_methods";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import Subtask from "@/models/Subtask";
import Status from "@/models/Status";

export async function DELETE(request, { params }) {
  await dbConnect();

  const task_id = params.id;
  const data = request.json();

  const task = await Task.findOne({ _id: task_id });

  if (data.author_id == task.doer) {
    const board_id = task.board_id;
    await Subtask.deleteMany({ task: task_id });
    await Task.findByIdAndDelete(task_id);

    let boardData = await GetBoardData(board_id);
    return NextResponse.json(
      {
        message: "task deleted",
        boardData: boardData,
      },
      { status: 200 }
    );
  }
  return NextResponse.json(
    {
      message: "вы не админ",
    },
    { status: 403 }
  );
}

export async function POST(request, { params }) {
  await dbConnect();

  const requestBody = request.body;

  Task.findByIdAndUpdate(params.id, { index: requestBody.index });

  let updatedTask = Task.findById(params.id);

  let boardData = await GetBoardData();

  return NextResponse.json({
    message: "task updated",
    task: updatedTask,
    boardData: boardData,
  });
}