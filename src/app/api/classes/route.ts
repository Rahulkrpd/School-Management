import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createClass } from "@/controllers/classController";

export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();

    const cls = await createClass(body);

    return NextResponse.json(cls);
}