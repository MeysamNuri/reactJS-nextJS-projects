import React,{useCallback} from 'react'

function Header_icons({ rightIcon, leftIcon, title, handleRightClick, handleLeftClick }) {
    return (
        <div className="icons">
            <img
                className="notif-top-close-searchbar"
                src={rightIcon}
                alt=""
                onClick={ handleRightClick}
            />

            <p style={{fontSize:'1.1rem'}}>{title}</p>
            <img className="notif-top-menu"
                onClick={handleLeftClick}
                src={leftIcon} alt="" />
        </div>
    )
}

export default React.memo(Header_icons);
