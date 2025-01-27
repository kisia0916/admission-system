import React from 'react'
import "./TopBar.css"

function TopBar() {
  return (
    <div className='TopBar'>
        <div className='TopBarWarp'>
            <div className='TopBarLeft'>
                <span className='TopBarTitle'>Entry System</span>
            </div>
            <div className='TopBarRight'>
                <span className='TopBarSysVer'>v1.0</span>
            </div>
        </div>
    </div>
  )
}

export default TopBar