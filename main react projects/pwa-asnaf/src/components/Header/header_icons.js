import React from "react";

function Header_icons({
  rightIcon,
  leftIcon,
  title,
  handleRightClick,
  handleLeftClick,
  iconStyle,
}) {
  return (
    <div className="icons" style={iconStyle}>
      {rightIcon && (rightIcon.substr(0, 4) === "data" || rightIcon.substr(0,3)) === 'ass' ? (
        <img
          className="notif-top-close-searchbar"
          src={rightIcon}
          alt=""
          onClick={handleRightClick}
        />
      ) : (
        <p onClick={handleRightClick}>{rightIcon}</p>
      )}

      <p style={{ fontSize: "1.1rem" }}>{title}</p>
      <img
        className="notif-top-menu"
        onClick={handleLeftClick}
        src={leftIcon}
        alt=""
      />
    </div>
  );
}

export default React.memo(Header_icons);
