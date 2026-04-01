import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createTeacher } from "@/controllers/teacherController";

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();

    const teacher = await createTeacher(body);

    return NextResponse.json(teacher);
}