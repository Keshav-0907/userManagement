import connectToDB from "@/utils/connectToDB";
import { NextResponse, NextRequest } from "next/server";
import Organisation from "@/models/organisationModel";

export async function POST(req: NextRequest) {
    const { id } = await req.json();

    await connectToDB();

    const org = await Organisation.findByIdAndDelete(id);

    if (!org) {
        return NextResponse.json({
            status: "error",
            message: "Organisation not found",
        });
    }

    return NextResponse.json({
        status: "success",
        message: "Organisation deleted successfully",
    });
}
