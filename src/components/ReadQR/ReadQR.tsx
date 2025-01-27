"use client"
import React, { useEffect, useRef, useState } from 'react'
import {jwtDecode} from "jwt-decode";
import jsQR from "jsqr"
import "./ReadQR.css"
import { api_response_admission } from '@/app/api/admission/route';

function ReadQR() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoWidth,setVideoWidth] = useState<number>(400)
  const [videoHeight,setVideoHeight] = useState<number>(400)
  const [decode_result,set_decode_result] = useState<string>("")
  const config = {
    audio: false,
    video: {
      facingMode: { ideal: "environment" } // ideal を使って柔軟に対応
    }
  };

  useEffect(()=>{
    setVideoHeight(400)
    setVideoWidth(400)
    const check_qr = async()=>{
    const ctx:CanvasRenderingContext2D | null | undefined = canvasRef.current?.getContext("2d")
      if (ctx && videoRef.current){
        ctx.drawImage(videoRef.current,0,0,videoRef.current.clientWidth,videoRef.current.clientHeight)
        const cam_data = ctx.getImageData(0,0,videoRef.current.clientWidth,videoRef.current.clientHeight)
        const code = jsQR(cam_data.data,cam_data.width,cam_data.height)
        if (code){
          const decoded_token = jwtDecode(code.data)
          set_decode_result(JSON.stringify(decoded_token,null,2))
          const res = await fetch("/api/admission",{
            method:"post",
            body:JSON.stringify({token:code.data}),
            cache:"no-store"
          },)
          const api_result:api_response_admission = await res.json()
          if (api_result.message === "done"){
            alert("入場が完了しました")
          }else if (api_result.message === "already admitted"){
            alert("既に入場済みです")
          }else{
            alert("エラーが発生しました")
          }
        }
        setTimeout(()=>{
          check_qr()
        },200)
      }
    }
    const start_cam = async()=>{
      const stream = await navigator.mediaDevices.getUserMedia(config)
      if (videoRef.current && canvasRef.current){
        videoRef.current.srcObject = stream;
        canvasRef.current.width = videoRef.current.clientWidth
        canvasRef.current.height = videoRef.current.clientHeight
        check_qr()
      }
    }
    start_cam()
  },[])
  return (
    <div>
      <canvas ref={canvasRef} className='canvas'></canvas>
      <video ref={videoRef} autoPlay  width={videoWidth} height={videoHeight}></video>
      <div className='data_area'>
      <pre className="json-display">
        <code>{decode_result}</code>
      </pre>
      </div>
    </div>
  )
}

export default ReadQR