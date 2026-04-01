import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createPrincipal } from "@/controllers/principalController";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const principal = await createPrincipal(body);

        return NextResponse.json({
            success: true,
            principal,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}