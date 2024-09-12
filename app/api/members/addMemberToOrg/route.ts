import { NextResponse, NextRequest } from "next/server";
import Member from "@/models/MemberModal";
import Organisation from "@/models/organisationModel";

export async function POST(req: NextRequest) {
    console.log('here')
    const { name, email, organisation } = await req.json();

    const NewMember = new Member({
        name,
        email,
        role: "member",
        organisation,
        createdOn: new Date(),
    });

    await NewMember.save();

    const org = await Organisation.findById(organisation);

    if (!org) {
        return NextResponse.json({
            status: "error",
            message: "Organisation not found",
        });
    }

    org.membersCount += 1;
    org.allMembers.push(NewMember._id);

    await org.save();

    return NextResponse.json({
        status: "success",
        message: "Member added successfully",
        data: NewMember,
    });
}
