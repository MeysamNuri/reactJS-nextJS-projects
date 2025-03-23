import React from "react";
import Header from "../../components/header/Header";
import './user-manual.less'
import { ifram_url } from '../../../constants/base_url'

function UserManual() {
  return (
    <div className="gray-bg" style={{display:'flex', alignItems:'center',flexDirection:'column', height:'100vh'}}>
      <Header
        title="راهنمای استفاده"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={"main"}
      />
      <div className='user-manual-div'>
        <iframe className='ifram' src={`${ifram_url}instruction`} frameborder="0"></iframe>
      </div>
    </div>
  );
}

export default UserManual;
