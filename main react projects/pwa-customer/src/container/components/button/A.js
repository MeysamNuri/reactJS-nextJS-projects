import React from 'react'
import './A.less'
function A({ title, style, handleClick, children }) {
    return (
        <div className="big_button"
            style={style}
            onClick={handleClick}>
            {children || title}
        </div>
    )
}

export default A
