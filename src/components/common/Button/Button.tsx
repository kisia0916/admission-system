"use client"
import React from 'react'
import "./Button.css"
import { useRouter } from 'next/navigation'

function Button(props:{text:string,redirect_path:string,isloading:boolean}) {
  return (
    <>
    {props.isloading?      
      <div className='loadingButton'> 
          <span className='loadingButtonText'>{"Loading...."}</span>
      </div>:
      <button className='Button' type='submit'> 
          <span className='ButtonText'>{props.text}</span>
      </button>
    }
    </>
  )
}

export default Button