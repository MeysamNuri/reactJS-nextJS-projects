import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import "./policy.less";
import { ifram_url } from '../../../constants/base_url'

export default function Policy() {
  const history = useHistory();

  const handleLeftClick = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="policy_container">
      <Header
        title="قوانین و مقررات"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        handleLeftClick={(e) => handleLeftClick(e)}
      />
      <div className="policy_content">
          <iframe
            className="ifram"
            src={`${ifram_url}policy`}
            frameborder="0"
          ></iframe>
      </div>
    </div>
  );
}
