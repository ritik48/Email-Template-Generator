import { User } from "@/app/_models/user.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    await User.create({ email, password });
    return NextResponse.json(
      { success: true, message: "Account created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
