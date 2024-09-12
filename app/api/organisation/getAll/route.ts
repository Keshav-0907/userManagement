import { NextResponse, NextRequest } from "next/server";
import connectToDB from "@/utils/connectToDB";
import Organisation from "@/models/organisationModel";


export async function POST(req: NextRequest) {
    await connectToDB()

    const organisations = await Organisation.find({})

    return NextResponse.json({
        status: "success",
        data: organisations
    })
}