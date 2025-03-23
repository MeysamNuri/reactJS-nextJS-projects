import React from 'react';
import './logo.less';

function Logo() {
  return (
    <div className="background_logo">
      <img src='assets/images/right-notif.svg' className="right" alt='right-notif' />
      <img src='assets/images/left-notif.svg' className="left" alt='' />
      <img src='assets/images/left-notif.svg' className="left" alt='' />
    </div>
  );
}

export default React.memo(Logo);
