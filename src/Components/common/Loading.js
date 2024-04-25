import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "../../assests/styles/Loading.css";

function Loading() {
  return (
    <div className='loading'>
      <HashLoader color='#fff' size={120} />
    </div>
  );
}
export default Loading;


