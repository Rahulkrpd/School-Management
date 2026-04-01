import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { assignTeacher } from "@/controllers/classController";

export async function POST(req: NextRequest) {
    await connectDB();
    const { classId, teacherId } = await req.json();

    const result = await assignTeacher(classId, teacherId);

    return NextResponse.json(result);
}