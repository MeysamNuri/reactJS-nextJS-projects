import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../logo/logo";
import HeaderIcons from "./header_icons";
import Search from "./search";
import "./header.less";

function Header({
  title,
  rightIcon,
  leftIcon,
  back,
  isSearch,
  placeholder,
  url,
  handleLeftClick,
  handleRightClick,
  style,
  handleSearch,
}) {
  const history = useHistory();
  const handleBackClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div
      style={style}
      className={"header".concat(isSearch ? " searchbar" : "")}
    >
      <Logo />
      <HeaderIcons
        title={title}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        handleLeftClick={back !== null ? handleBackClick : handleLeftClick}
        handleRightClick={handleRightClick}
      />
      {isSearch && (
        <Search placeholder={placeholder} handleSearch={handleSearch} />
      )}
    </div>
  );
}

export default React.memo(Header);
