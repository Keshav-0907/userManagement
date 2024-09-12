import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import Member from "@/models/MemberModal"
import Organisation from "@/models/organisationModel"

export async function POST(req: NextRequest) {
    try {
        const { memberID, orgID } = await req.json();

        if (!memberID || !orgID) {
            return NextResponse.json({
                status: "error",
                message: "Missing memberID or orgID",
            }, { status: 400 });
        }

        await connectToDB();

        const member = await Member.findById(memberID);

        if (!member) {
            return NextResponse.json({
                status: "error",
                message: "Member not found",
            }, { status: 404 });
        }

        const organisation = await Organisation.findById(orgID);

        if (!organisation) {
            return NextResponse.json({
                status: "error",
                message: "Organisation not found",
            }, { status: 404 });
        }

        await Member.findByIdAndDelete(memberID);

        organisation.allMembers = organisation.allMembers.filter(
            (memberId) => memberId.toString() !== memberID
        );

        await organisation.save();

        return NextResponse.json({
            status: "success",
            message: "Member deleted successfully",
        }, { status: 200 });
    } catch (error) {
        console.error("Error deleting member:", error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred while deleting the member",
        }, { status: 500 });
    }
}