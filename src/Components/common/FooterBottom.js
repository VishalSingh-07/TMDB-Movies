import React from "react";
import "../../assests/styles/Footer.css";
import FooterIcon from "../../assests/Image/FooterIcon.svg";

function FooterBottom() {
  return (
    <div className='foot'>
      <img src={FooterIcon} />
      <p>
        <a href='mailto:vishalsinghagr25@gmail.com'>Made by Vishal Singh 🔥</a> |{" "}
        <a href='https://www.linkedin.com/in/vishal-singh-733570200/'>LinkedIn</a>
      </p>
    </div>
  );
}
export default FooterBottom;
