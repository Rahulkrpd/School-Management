import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { username, email, password, role } = await req.json();

        const hashed = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashed,
            role,
        });

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}