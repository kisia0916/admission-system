import React from 'react'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Message from '../Message/Message'
import "./Section.css"
import Button from '@/components/common/Button/Button'

function Section(props:{label:string,hint:string}) {
  return (
    <div className='Section'>
        <Label text={props.label}/>
        <Input hint={props.hint}/>
        <Message text='error'/>
    </div>
  )
}

export default Section