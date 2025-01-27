"use client"
import { useQRCode } from 'next-qrcode'
import React from 'react'
import "./TokenQR.css"

function TokenQR(props:{text:string}) {
  const {SVG} = useQRCode()
  return (
    <div className='TokenQRMain'>
        <SVG
        text={props.text}
        options={{
            margin: 2,
            width: 200,
            color: {
            dark: '#000000',
            light: '#ffffff',
            },
        }}
        />
    </div>
  )
}

export default TokenQR