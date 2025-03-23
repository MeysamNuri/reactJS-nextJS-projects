import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../logo/logo';
import HeaderIcons from './header_icons';
import './header.less';

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
  iconStyle,
}) {
  const history = useHistory();
  const handleBackClick = e => {
    e.preventDefault();
    history.push(back);
  };

  return (
    <div
      // style={{
      //   background:
      //     title === 'وام' ? 'linear-gradient(90deg, #E954B2, #C71B77)' : '',
      // }}
      style={style}
      className="header"
    >
      <Logo />
      <HeaderIcons
        title={title}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        handleLeftClick={back !== null ? handleBackClick : handleLeftClick}
        handleRightClick={handleRightClick}
        iconStyle={iconStyle}
      />
    </div>
  );
}

export default React.memo(Header);
