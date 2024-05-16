import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Status from "@/models/Status";
import User from "@/models/User";
import mongoose from "mongoose";
import Subtask from "@/models/Subtask";

export async function GetBoardData(board_id) {
  await dbConnect();
  let statuses = await Status.find({ board_id: board_id });

  let statusTasks = [];

  for (let i = 0; i < statuses.length; i++) {
    let tasks = await Task.find({ status: statuses[i]._id });
    let tasksWithDoerData = [];
    for (let i = 0; i < tasks.length; i++) {
      const data = await GetTaskStruct(tasks[i]);

      tasksWithDoerData.push(data);
    }

    let data = {
      _id: statuses[i]._id,
      board_id: statuses[i].board_id,
      name: statuses[i].name,
      type: statuses[i].type,
      index: statuses[i].index,
      tasks: tasksWithDoerData,
    };
    statusTasks.push(data);
  }
  return statusTasks;
}

export async function GetStatusData(status) {
  let tasks = await Task.find({ status: status._id });
  let tasksWithDoerData = [];
  for (let i = 0; i < tasks.length; i++) {
    const data = await GetTaskStruct(tasks[i]);

    tasksWithDoerData.push(data);
  }

  let data = {
    _id: status._id,
    board_id: status.board_id,
    name: status.name,
    type: status.type,
    index: status.index,
    tasks: tasksWithDoerData,
  };
  return data;
}

export async function GetTaskStruct(task) {
  let doer = await User.findById(task.doer);
  let doerData;
  if (doer) {
    doerData = {
      _id: doer._id,
      name: doer.name,
      email: doer.email,
    };
  }

  let subtasks = await Subtask.find({ task: task._id });

  let data = {
    _id: task._id,
    name: task.name,
    description: task.description,
    status: task.status,
    doer: doerData,
    index: task.index,
    is_completed: task.is_completed,
    priority: task.priority,
    deadLineDate: task.deadLineDate,
    startDate: task.startDate,
    subtasks: subtasks,
  };
  return data;
}

export function InRange(x, min, max) {
  return ((x-min)*(x-max) <= 0);
}