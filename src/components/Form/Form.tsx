"use client"
import React, { useState } from 'react'
import "./Form.css"
import Section from './Section/Section'
import Button from '../common/Button/Button'
import { sendAuthEmail } from '@/actions/sendAuthEmail'
import { useRouter } from 'next/navigation'

function Form() {
  const router = useRouter()
  const [loading,set_loading] = useState(false)
  const redirect_result = ()=>{
    set_loading(true)
    router.push("/result")
  }
  return (
    <div className='FormMain'>
        <div className='FormMainWrap'>
          <form action={sendAuthEmail} method='POST' onSubmit={redirect_result}>
              <Section label='Username' hint='Name'/>
              <Section label='Email' hint='Email'/>
              <div className='FormButtonWrap'>
                  <Button text='Submit' redirect_path='/result' isloading={loading}/>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Form