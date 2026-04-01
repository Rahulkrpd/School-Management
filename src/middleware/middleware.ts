import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const decoded: any = verifyToken(token);

        // Example: only principal can access admin routes
        if (req.nextUrl.pathname.startsWith("/api/admin")) {
            if (decoded.role !== "principal") {
                return NextResponse.json(
                    { error: "Forbidden" },
                    { status: 403 }
                );
            }
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: ["/api/:path*"], // protect all APIs
};