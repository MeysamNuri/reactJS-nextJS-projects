import React from 'react'
import './logo.less'

function Logo() {
    return (
        <div className="background_logo">
            <img src='assets/images/right-notif.svg' className="right"/>
            <img src='assets/images/left-notif.svg' className="left" />
        </div>
    )
}

export default React.memo(Logo);
