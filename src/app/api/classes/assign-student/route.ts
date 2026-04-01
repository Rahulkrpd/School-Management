import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { assignStudent } from "@/controllers/classController";

export async function POST(req: NextRequest) {
    await connectDB();
    const { studentId, classId } = await req.json();

    const result = await assignStudent(studentId, classId);

    return NextResponse.json(result);
}