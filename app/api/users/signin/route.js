import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const data = await request.json();

  const email = data.email;
  const password = data.password;
  const user = await User.findOne({ email: email });

  let correctPassword = false;
  if (user) {
    if (password === user.password) {
      correctPassword = true;
    }
  }
  if (correctPassword) {
    return NextResponse.json({ user }, { status: 200 });
  }
  return NextResponse.json({
    message: "User not found or incorrect password",
  });
}
