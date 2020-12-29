/**
 *
 * ProfilePic
 *
 */

import React from "react";
import "./profile-pic.less";

function ProfilePic({ avatar }) {
  return (
    <div className="profile-pic">
      <img src={avatar !== null ? avatar : 'assets/images/user-pic.svg'} alt="" />
    </div>
  );
}

ProfilePic.propTypes = {};

export default ProfilePic;
