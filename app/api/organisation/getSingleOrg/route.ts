import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import Organisation from "@/models/organisationModel";
import Member from "@/models/MemberModal";
import OrgAdmin from "@/models/orgAdminModal";

export async function POST(req: NextRequest) {
    const { id } = await req.json();

    await connectToDB();

    try {
        const organisation = await Organisation.findById(id);

        if (!organisation) {
            return NextResponse.json({
                status: "error",
                message: "Organisation not found",
            });
        }
        const allMembers = await Member.find({ organisation: id });
       
        return NextResponse.json({
            status: "success",
            data: organisation,
            members: allMembers,
        });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: error.message,
        });
    }
}
