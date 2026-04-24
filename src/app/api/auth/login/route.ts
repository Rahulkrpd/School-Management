import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Missiging required fileds " },
                { status: 400 }
            )
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = signToken({
            id: user._id,
            role: user.role,
        });

        const response = NextResponse.json({
            success: true,
            token,
            // user: {
            //     id: user._id,
            //     username: user.username,
            //     role: user.role,
            // },
            user,
        });

        // store token in cookie (recommended)
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
        });

        return response;
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json(
            { error: message },
            { status: 400 }
        );
    }
}