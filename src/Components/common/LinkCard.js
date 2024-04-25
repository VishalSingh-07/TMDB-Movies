import React from "react";
import Links from "./Link";
import "../../assests/styles/LinkCard.css";
function LinkCard() {
  return (
    <div className='LinkCard'>
      {Links.map((LinkItem) => (
        <div className='Links'>
          <div className='column'>
            <a href={LinkItem.link}>{LinkItem.Name}</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LinkCard;
