import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import Organisation from "@/models/organisationModel";
import OrgAdmin from "@/models/orgAdminModal";

export async function POST(req: NextRequest) {
    const {name, adminName, adminEmail} = await req.json()
    await connectToDB()


    const newOrg = new Organisation({
        name,
        adminName,
        adminEmail,
        membersCount: 1,
        createdOn: new Date(),
        allMembers: []
    })

    const newOrgAdmin = new OrgAdmin({
        name: adminName,
        email: adminEmail,
        orgId: newOrg._id,
        password: "123456",
        role: "admin"
    })

    newOrg.allMembers.push(newOrgAdmin._id);

    await newOrgAdmin.save();

    if(!name || !adminName || !adminEmail) {
        return NextResponse.json({
            status: "error",
            message: "All fields are required"
        })
    }

    await newOrg.save();

    return NextResponse.json({
        status: "success",
        message: "Organisation created successfully",
        data : newOrg
    })



}