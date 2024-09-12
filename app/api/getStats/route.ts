import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import Member from "@/models/MemberModal";
import Organisation from "@/models/organisationModel";

export async function POST(req: NextRequest) {
    await connectToDB();
    
    const memberCount = await Member.countDocuments({});
    
    // Count total number of organizations
    const organisationCount = await Organisation.countDocuments({});

    // Return the counts as a JSON response
    return NextResponse.json({
        memberCount,
        organisationCount
    });
}
