import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Board from "@/models/Board";
import User from "@/models/User";
import Status from "@/models/Status";
import Subtask from "@/models/Subtask";
import Message from "@/models/Message";
import { NextResponse } from "next/server";
import Access from "@/models/Access";

export async function GET(request) {
  await dbConnect();
  await Access.deleteMany();
  await Board.deleteMany();
  await Task.deleteMany();
  await User.deleteMany();
  await Status.deleteMany();
  await Subtask.deleteMany();
  await Message.deleteMany();
  let user = new User();
  user.name = "Денис Пиялкин";
  user.email = "tankizlego@gmail.com";
  user.password = "321";
  await user.save();

  user = new User();
  user.name = "Илья Шимозёров";
  user.email = "ilia.shimozerov@gmail.com";
  user.password = "123";
  await user.save();

  let users = await User.find();

  let board = new Board();
  board.name = "Канбанy";
  board.author = users[1]._id;
  board.description = "Тестовый канбан";
  await board.save();

  let kanban = await Board.findOne();

  let status = new Status();
  status.board_id = kanban._id;
  status.type = "TODO"
  status.name = "Надо сделать";
  status.index = 0;
  await status.save();

  status = new Status();
  status.board_id = kanban._id;
  status.type = "DONE"
  status.name = "Сделано";
  status.index = 1;
  await status.save();

  let access = new Access();
  access.user_id = user._id;
  access.board_id = kanban._id;
  await access.save();

  let statuses = await Status.find();

  let task = new Task();
  task.board_id = kanban._id;
  task.name = "Сделать канбан";
  task.description = "Надо сделать канбан";
  task.status = statuses[0]._id;
  task.doer = users[1]._id;
  task.index = 0;
  await task.save();

  task = new Task();
  task.board_id = kanban._id;
  task.name = "Сделать API";
  task.description = "Надо сделать API";
  task.status = statuses[1]._id;
  task.doer = users[0]._id;
  task.index = 0;
  await task.save();

  let tasks = await Task.find();

  let subtask = new Subtask();
  subtask.task = tasks[0]._id;
  subtask.name = "Сделать канбан";
  subtask.done = false;
  await subtask.save();

  subtask = new Subtask();
  subtask.task = tasks[0]._id;
  subtask.name = "Не сломать канбан";
  subtask.done = true;
  await subtask.save();

  subtask = new Subtask();
  subtask.task = tasks[1]._id;
  subtask.name = "Сделать API";
  subtask.done = true;
  await subtask.save();

  subtask = new Subtask();
  subtask.task = tasks[1]._id;
  subtask.name = "Не сломать API";
  subtask.done = false;
  await subtask.save();

  let message = new Message();
  message.board = kanban._id;
  message.author = users[0]._id;
  message.index = 0;
  message.text = "Привет";
  message.date = new Date("2023-04-17T10:36:00");
  await message.save();

  message = new Message();
  message.board = kanban._id;
  message.author = users[1]._id;
  message.index = 1;
  message.text = "Здарова";
  message.date = new Date("2023-04-17T10:36:10");
  await message.save();

  message = new Message();
  message.board = kanban._id;
  message.author = users[0]._id;
  message.index = 2;
  message.text = "Пока";
  message.date = new Date("2023-04-17T10:36:20");
  await message.save();

  message = new Message();
  message.board = kanban._id;
  message.author = users[1]._id;
  message.index = 3;
  message.text = "И тебе того же";
  message.date = new Date("2023-04-17T10:36:30");
  await message.save();

  return NextResponse.json({
    message: "в монгу все запихано",
  });
}
