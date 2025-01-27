import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";
import jwt from "jsonwebtoken"
import { jwtDecode } from "jwt-decode";
import { prisma } from "../../../../lib/db";


export const body_schema = z.object({
    token:string()
})
type body_type = z.infer<typeof body_schema>
interface token_type {
    name:string,
    email:string,
    iat:string
}
export type api_response_admission = {message:string}

export async function POST(req:NextRequest):Promise<NextResponse<api_response_admission>>{
    try{
        const body = await req.json()
        const body_data:body_type = body_schema.parse(body)
        jwt.verify(body_data.token,process.env.JWT_SECRET_KEY as string)
        const decoded_token:token_type = jwtDecode(body_data.token)
        const target_user = await prisma.user.findMany({
            where:{
                email:decoded_token.email
            }
        })
        if (target_user.length>0){
            if(target_user[0].isAdmission) return NextResponse.json({message:"already admitted"})
        }
        await prisma.user.update({
            where:{
                email:decoded_token.email
            },
            data:{
                isAdmission:true
            }
        })
        return NextResponse.json({message:"done"})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"server error"})
    }
}