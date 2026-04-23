import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { replacePrincipal } from "@/controllers/principalController";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const principal = await replacePrincipal(body);

        return NextResponse.json({
            success: true,
            principal,
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json(
            { error: message },
            { status: 400 }
        );
    }
}