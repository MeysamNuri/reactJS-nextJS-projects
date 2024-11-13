import React, { useEffect, useState } from "react";
import InfinitList from "../../components/infinit-list";

function AllNotification() {
  const [notifications, setNotifications] = useState([]);
  
  // useEffect(() => {
  //   window.scrollTo(0, '10vh');
  // }, []);

  return (
    <>
        <InfinitList
          state={notifications}
          setState={setNotifications}
          scrollable={true}
        />
    </>
  );
}

export default AllNotification;
