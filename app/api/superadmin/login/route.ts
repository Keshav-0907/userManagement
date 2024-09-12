import { NextRequest, NextResponse } from "next/server";
import SuperAdmin from "@/models/superAdminModel";
import connectToDB from "@/utils/connectToDB";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    await connectToDB();

    const isAdmin = await SuperAdmin.findOne({ email });
    if (!isAdmin) {
        return NextResponse.json({
            status: false,
            message: "You are not authorized to create super admin",
        });
    }

    if (isAdmin.password !== password) {
        return NextResponse.json({
            status: false,
            message: "Password is incorrect",
        });
    }

    const token = jwt.sign({ isAdmin }, "secret");

    return NextResponse.json({
        message: "Super Admin LoggedIn",
        token,
        staus: true
    });
}
