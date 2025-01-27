import React from 'react'
import "./TicketPage.css"
import TokenQR from '@/components/TokenQR/TokenQR'
import jwt from "jsonwebtoken"


async function page({params}: {params: {token: string}}) {
  const {token} = await params
  let display_flg:boolean = true
  let qr_text:string = ""
  const decoded_token = token as string
  try{
    const verified_token = jwt.verify(decoded_token,process.env.JWT_SECRET_KEY as string)
    qr_text = decoded_token
  }catch(error){
    display_flg = false
  }
  return (
    <div className='TicketPageMain'>
      {display_flg?
          <TokenQR text={qr_text}/>
          :<span>トークンが無効です</span>
      }
    </div>
  )
}

export default page