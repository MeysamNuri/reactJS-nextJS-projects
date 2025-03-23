import React, { useEffect, useState } from "react";
import "./profile-pic.less";
import store from "store-js";
import { useHistory } from 'react-router-dom';

function ProfilePic() {
  const [img, setImg] = useState(null);
  const profileData = store.get("profile_data");
  const history = useHistory()
  
  useEffect(() => {
    if (profileData !== undefined && profileData.avatar !== null) {
      if (profileData.avatar.substr(0, 4) === "data") {
        setImg(profileData.avatar);
      } else {
        setImg(`https://images.daapapp.com/images/${profileData.avatar}`);
      }
    } else {
      setImg("assets/images/user-pic.svg");
    }
  }, [profileData]);

  return (
    <div className="profile-pic" onClick={()=> history.push("profile")}>
      <img
        src={img}
        className={profileData && 'avatar-style'}
        alt=""
      />
    </div>
  );
}

export default ProfilePic;
