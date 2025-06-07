import { User } from "@/app/_models/user.model";
import { connectDB } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return Response.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    await User.create({ email, password });
    return Response.json(
      { success: true, message: "Account created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
