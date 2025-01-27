import React from 'react'
import "./Message.css"

function Message(props:{text:string}) {
  return (
    <div>
        <span className='MessageText'>{props.text}</span>
    </div>
  )
}

export default Message