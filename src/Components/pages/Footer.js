import React from "react";
import "../../assests/styles/Footer.css";
import LinkCard from "../common/LinkCard";
import Foot from "../common/FooterBottom";
function Footer() {
  return (
    <div className='Footer'>
      <div className='Question'>
        <h3>Questions? Call 000-800-040-1843</h3>
      </div>
      <LinkCard />

      <div className='Note'>
        <p>
          <strong>Note:</strong> Please Refresh the page 1-2 times if Movie Poster is not visible.
        </p>
      </div>
      <Foot />
    </div>
  );
}

export default Footer;
