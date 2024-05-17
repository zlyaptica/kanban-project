import { GetBoardData, GetStatusData, GetTaskStruct, InRange } from "@/utils/utility_methods";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import Subtask from "@/models/Subtask";
import Status from "@/models/Status";
import Board from "@/models/Board";
import User from "@/models/User";

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
  let resultStatus = "success";
  let boardData;
  let updatedTask;
  await dbConnect();

  const task_id = params.id;

  const data = await request.json();

  let task = await Task.findOne({ _id: task_id });
  const board = await Board.findOne({ _id: task.board_id });
  if (data.author_id == board.author) {
    if (data.field == "name") {
      await Task.findByIdAndUpdate(task_id, { name: data.name });
    }
    if (data.field == "description") {
      await Task.findByIdAndUpdate(task_id, {
        description: data.description,
      });
    }
    if (data.field == "is_completed") {
      await Task.findByIdAndUpdate(task_id, {
        is_completed: data.is_completed,
      });
    }
    if (data.field == "priority") {
      await Task.findByIdAndUpdate(task_id, {
        priority: data.priority,
      });
    }
    if (data.field == "index") {
      let originalIndex = task.currentTaskIndex
      let setIndex = data.setIndex

      await Task.findByIdAndUpdate(task_id, {
        index: setIndex,
      });

      let tasks = Task.find({ board_id: task.board_id, status: task.status })

      for (let index = 0; index < tasks.length; index++) {
        const updatedTask = tasks[index];

        if (InRange(updatedTask.index, originalIndex, setIndex)){
          let movedIndex

          if (setIndex > originalIndex){
            movedIndex = updatedTask.index - 1
          }
          else{
            movedIndex = updatedTask.index + 1
          }

          await Task.findByIdAndUpdate(updatedTask._id, {
            index: movedIndex
          })
        }
      }
    }

    if (data.field == "doer") {
      const foundUser = await User.findOne({ email: data.doerEmail });
      if (foundUser) {
        if (data.type == "set") {
          await Task.findByIdAndUpdate(task_id, {
            doer: foundUser._id,
          });
        }
        if (data.type == "unset") {
          await Task.findByIdAndUpdate(task_id, {
            $unset: { doer: foundUser._id },
          });
        }
      } else {
        resultStatus = "user not found";
      }
    }

    if (data.field == "deadLineDate") {
      if (data.deadLineDate) {
        if (task.startDate && new Date(data.deadLineDate) < task.startDate) {
          resultStatus = "wrong range";
        } else {
          resultStatus = "current range for deadline";
        }
      } else {
        await Task.findByIdAndUpdate(task_id, {
          $unset: { deadLineDate: data.deadLineDate },
        });
      }
    }
    if (data.field == "startDate") {
      if (data.startDate) {
        if (task.deadLineDate && new Date(data.startDate) > task.deadLineDate) {
          resultStatus = "wrong range";
        } else {
          resultStatus = "current range for startDate";
        }
      } else {
        await Task.findByIdAndUpdate(task_id, {
          $unset: { startDate: data.startDate },
        });
      }
    }
  } else {
    resultStatus = "error";
  }

  if (resultStatus == "user not found") {
    return NextResponse.json(
      {
        message: "неверно указана почта пользователя",
      },
      { status: 400 }
    );
  }

  if (resultStatus == "current range for deadline") {
    await Task.findByIdAndUpdate(task_id, {
      deadLineDate: data.deadLineDate,
    });
  }

  if (resultStatus == "current range for startDate") {
    await Task.findByIdAndUpdate(task_id, {
      startDate: data.startDate,
    });
  }

  if (resultStatus == "wrong range") {
    return NextResponse.json(
      {
        message: "неверно указан диапазон дат",
      },
      { status: 400 }
    );
  }

  if (resultStatus == "error") {
    return NextResponse.json(
      {
        message: "вы не создатель доски",
      },
      { status: 403 }
    );
  }

  boardData = await GetBoardData(task.board_id);
  let taskData = await Task.findOne({ _id: task_id })
  updatedTask = await GetTaskStruct(taskData)

  return NextResponse.json(
    {
      message: "поле успешно изменено",
      boardData: boardData,
      updatedTask: updatedTask,
    },
    { status: 200 }
  );
}