import dbConnect from "@/lib/dbConnect";
import Board from "@/models/Board";
import Subtask from "@/models/Subtask";
import Task from "@/models/Task";
import { GetBoardData, GetTaskStruct } from "@/utils/utility_methods";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    await dbConnect();
  
    const subtask_id = params.subtask_id;
    const data = await request.json();
    console.log(data)

    const task = await Task.findOne({ _id: data.task_id });
    const board = await Board.findOne({ _id: task.board_id });

    if (data.author_id == task.doer || data.author_id == board.author) {
        await Subtask.findByIdAndUpdate(subtask_id, {done: data.done})
    
        let boardData = await GetBoardData(board._id);
        let updatedTask = await GetTaskStruct(task)
                
        return (NextResponse.json({
            message: 'done subtask changed',
            updatedTask: updatedTask,
            boardData: boardData
        }, {status: 200}))
    }
    return NextResponse.json(
      {
        message: "недостаточно прав",
      },
      { status: 403 }
    );
  }

export async function DELETE(request, { params }) {
  await dbConnect();

  const subtask_id = params.subtask_id;
  const data = await request.json();

  const task = await Task.findOne({ _id: data.task_id });
  const board = await Board.findOne({ _id: task.board_id });

  if (data.author_id == task.doer || data.author_id == board.author) {
    const board_id = task.board_id;
    await Subtask.findByIdAndDelete(subtask_id);

    let boardData = await GetBoardData(board_id);
    let updatedTask = await GetTaskStruct(task);

    return NextResponse.json(
      {
        message: "subtask deleted",
        updatedTask: updatedTask,
        boardData: boardData,
      },
      { status: 200 }
    );
  }
  return NextResponse.json(
    {
      message: "недостаточно прав",
    },
    { status: 403 }
  );
}