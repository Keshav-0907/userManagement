import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import OrgAdmin from "@/models/orgAdminModal";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    await connectToDB();

    const orgAdmin = await OrgAdmin.findOne({ email });

    if (!orgAdmin) {
        return NextResponse.json({
            status: false,
            message: "Admin not found",
        });
    }

    if (orgAdmin.password !== password) {
        return NextResponse.json({
            status: false,
            message: "PWD wornf",
        });
    }

    const token = jwt.sign({
        email: orgAdmin.email,
        role: orgAdmin.role,
        _id: orgAdmin._id,
        orgId: orgAdmin.orgId,
    }, "secret");

    return NextResponse.json({
        status: 200,
        message: "Admin Login successful",
        token,
        orgAdmin,
    });
}
