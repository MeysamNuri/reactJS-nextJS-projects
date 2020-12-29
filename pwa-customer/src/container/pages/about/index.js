import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import "./about.less";
import { ifram_url } from '../../../constants/base_url'

export default function About() {
  const history = useHistory();

  const handleLeftClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className="about_container">
      <Header
        title="درباره داپ‌اَپ"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        handleLeftClick={(e) => handleLeftClick(e)}
      />
      <div className="content_container">
        <iframe className='ifram' src={`${ifram_url}about`} frameborder="0"></iframe>
      </div>
    </div>
  );
}
