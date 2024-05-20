import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const data = await request.json();

  let user = await User.findOne({ email: data.email });

  if (user) {
    return NextResponse.json(
      {
        message: "Пользователь с такой почтой уже существует",
      },
      { status: 400 }
    );
  }

  user = new User();
  user.name = data.name;
  user.email = data.email;
  user.password = data.password;
  await user.save();

  return NextResponse.json(
    {
      message: "user created",
      user: user,
    },
    { status: 201 }
  );
}
