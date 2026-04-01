import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createStudent } from "@/controllers/studentController";

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();

    const student = await createStudent(body);

    return NextResponse.json(student);
}