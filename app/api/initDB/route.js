import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import Board from '@/models/Board';
import User from '@/models/User';
import Status from '@/models/Status';
import Subtask from '@/models/Subtask';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';

export async function GET(request)
{
    await dbConnect();
    await Board.deleteMany();
    await Task.deleteMany();
    await User.deleteMany();
    await Status.deleteMany();
    await Subtask.deleteMany();
    await Message.deleteMany();

    let board  = new Board;
    board.name = 'Канбан';
    board.description = 'Тестовый канбан';
    await board.save();

    let user = new User;
    user.name = 'Илья Шимозёров';
    user.email = 'ilia.shimozerov@gmail.com';
    user.password = '123';
    await user.save();

    user = new User;
    user.name = 'Денис Пиялкин';
    user.email = 'tankizlego@gmail.com';
    user.password = '321';
    await user.save();

    let kanban = await Board.findOne();

    let status = new Status;
    status.board = kanban._id;
    status.name = 'Надо сделать';
    await status.save();

    status = new Status;
    status.board = kanban._id;
    status.name = 'Сделано';
    await status.save();

    let statuses = await Status.find();
    let users = await User.find();

    let task = new Task;
    task.board = kanban._id;
    task.name = 'Сделать канбан';
    task.description = 'Надо сделать канбан';
    task.status = statuses[0]._id;
    task.doer = users[0]._id;
    await task.save();

    task = new Task;
    task.board = kanban._id;
    task.name = 'Сделать API';
    task.description = 'Надо сделать API';
    task.status = statuses[1]._id;
    task.doer = users[1]._id;
    await task.save();

    let tasks = await Task.find();

    let subtask = new Subtask;
    subtask.task = tasks[0]._id;
    subtask.name = 'Сделать канбан';
    subtask.done = false;
    await subtask.save();

    subtask = new Subtask;
    subtask.task = tasks[0]._id;
    subtask.name = 'Не сломать канбан';
    subtask.done = true;
    await subtask.save();

    subtask = new Subtask;
    subtask.task = tasks[1]._id;
    subtask.name = 'Сделать API';
    subtask.done = true;
    await subtask.save();

    subtask = new Subtask;
    subtask.task = tasks[1]._id;
    subtask.name = 'Не сломать API';
    subtask.done = false;
    await subtask.save();

    let message = new Message;
    message.board = kanban._id;
    message.author = users[0]._id;
    message.index = 0;
    message.text = 'Привет';
    await message.save();

    message = new Message;
    message.board = kanban._id;
    message.author = users[1]._id;
    message.index = 1;
    message.text = 'Здарова';
    await message.save();

    message = new Message;
    message.board = kanban._id;
    message.author = users[0]._id;
    message.index = 2;
    message.text = 'Пока';
    await message.save();

    message = new Message;
    message.board = kanban._id;
    message.author = users[1]._id;
    message.index = 3;
    message.text = 'И тебе того же';
    await message.save();

    return (NextResponse.json({
        'message': 'в монгу все запихано'
    }))
};

/*
export async function GET(request) {
    await dbConnect()
    await Task.deleteMany()
    let newTask = new Task
    newTask.name = 'Максим Канбан'
    newTask.description = 'Максим Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Илья БД'
    newTask.description = 'Илья Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Денис API'
    newTask.description = 'Денис Сделать'
    await newTask.save()

    newTask = new Task
    newTask.name = 'Костя WEB Socket'
    newTask.description = 'Костя Сделать'
    await newTask.save()

    return (NextResponse.json({
        'message': 'данные заполнены'
    }))
}
*/