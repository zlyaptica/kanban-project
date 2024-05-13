import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Status from "@/models/Status";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GetBoardData(board_id) {
  await dbConnect();
  let statuses = await Status.find({ board_id: board_id });

  let statusTasks = [];

  for (let i = 0; i < statuses.length; i++) {
    let tasks = await Task.find({ status: statuses[i]._id });
    let tasksWithDoerData = [];
    for (let i = 0; i < tasks.length; i++) {
      let doerData;
      if (tasks[i].doer) {
        let doer = await User.findById(tasks[i].doer);
        doerData = {
          _id: doer._id,
          name: doer.name,
          email: doer.email,
        };
      }

      let data = {
        _id: tasks[i]._id,
        name: tasks[i].name,
        description: tasks[i].description,
        status: tasks[i].status,
        doer: doerData,
        index: tasks[i].index,
      };

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
    let doerData;
    if (tasks[i].doer) {
      let doer = await User.findById(tasks[i].doer);
      doerData = {
        _id: doer._id,
        name: doer.name,
        email: doer.email,
      };
    }

    let data = {
      _id: tasks[i]._id,
      name: tasks[i].name,
      description: tasks[i].description,
      board_id: tasks[i].board_id,
      status: tasks[i].status,
      doer: doerData,
      index: tasks[i].index,
    };

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
  return data
}