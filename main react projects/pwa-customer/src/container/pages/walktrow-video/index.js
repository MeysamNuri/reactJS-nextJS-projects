import React from "react";
import './walktrow-video.less'
import { useHistory } from 'react-router-dom'

function WalktrowVideo() {
  const [timer, setTimer] = React.useState(7);
   const history = useHistory();

  let timeout = "";
  let newPercent;
  React.useEffect(() => {
    timeout = setTimeout(() => {
      newPercent = timer - 1;
      if (newPercent === -1) {
        clearTimeout(timeout);
        return;
      }
      setTimer(newPercent);
    }, 1000);
  }, [timer]);

  const handleBtnClicked = e =>{
     e.preventDefault();
    
        history.push('/')
   
  }
  return (
    <div className='video-div'>
      
      <video
      
        width="100%"
        height="50%"
        controls
        src="https://videos.daapapp.com/general/customer-how-to.mp4"
      ></video>
      <button onClick={e=> handleBtnClicked(e)} style={{backgroundColor: '#009b7f'}}>{'رد کردن'}</button>
    </div>
  );
}

export default WalktrowVideo;
