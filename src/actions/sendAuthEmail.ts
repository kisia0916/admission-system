"use server"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { string, z } from "zod"
import { prisma } from "../../lib/db"
import fs from "fs"
import path from "path"

const user_schema = z.object({
    name:string(),
    email:string()
})
type user_type = z.infer<typeof user_schema>


const gen_send_html = (token:string)=>{
    const filePath = path.join(process.cwd(), 'public', 'mail', 'template.html');
    const data = fs.readFileSync(filePath,"utf-8")
    const place_holder = "{link}"
    const auth_url = `${process.env.SERVER_URL}/ticket/${token}`
    const send_html = data.replace(new RegExp(place_holder,"g"),auth_url)
    return send_html
}

export async function sendAuthEmail(formData:FormData){
    try{
        const name = formData.get("Name")
        const email = formData.get("Email")
        const user_data:user_type = user_schema.parse({
            name:name,
            email:email
        })
        const target_user = await prisma.user.findMany({
            where:{
                email:user_data.email
            }
        })
        let send_flg:boolean = true
        if (target_user.length === 0){
            await prisma.user.create({
                data:{
                    name:user_data.name,
                    email:user_data.email
                }
            })
        }else if (target_user[0].isAdmission){
            send_flg = false
        }
        if (send_flg){
            const jwt_token = jwt.sign(user_data,process.env.JWT_SECRET_KEY as string)
            const send_data = gen_send_html(jwt_token)
            const transporter = nodemailer.createTransport({
                service:"Gmail",
                auth:{
                    user:process.env.AUTH_MAIL_ADDRESS,
                    pass:process.env.GOOGLE_APPLICATION_PASS
                }
            })
            await transporter.sendMail({
                from:process.env.AUTH_MAIL_ADDRESS,
                to:user_data.email,
                subject:"Admission system auth mail",
                html:send_data
            })
        }
    }catch(error){
        console.log("Mail send error")
        console.log(error)
    }
}