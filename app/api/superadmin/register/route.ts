import { NextRequest, NextResponse } from "next/server";
import SuperAdmin from "@/models/superAdminModel";
import connectToDB from "@/utils/connectToDB";

export async function POST(req: NextRequest){
    const {email, password} = await req.json()
    await connectToDB()

    const superAdmin = await SuperAdmin.create({
        email,
        password
    })

    await superAdmin.save()


    return NextResponse.json({
        message: "Super Admin created"
    })
}