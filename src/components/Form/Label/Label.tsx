import React from 'react'
import "./Label.css"

function Label(props:{text:string}) {
  return (
    <div className='Label'>
        <span className='LabelText'>{props.text}</span>
    </div>
  )
}

export default Label