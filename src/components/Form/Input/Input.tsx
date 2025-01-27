import React from 'react'
import "./Input.css"

function Input(props:{hint:string}) {
  return (
    <div className='InputMain'>
        <input type='Text' name={props.hint} id={props.hint} required placeholder={`  ${props.hint}`} className='InputMainInput'/>
    </div>
  )
}

export default Input