import React, { useEffect } from "react";
import "../../assests/styles/Nav.css";
import Netflixlogo from "../../assests/Image/Navbar_Logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
function Nav() {
  const user = useSelector(selectUser);
  const [show, handleShow] = React.useState(false);
  const navigate = useNavigate();
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className='nav_contents'>
        <img
          onClick={() => navigate("/")}
          className='nav_logo'
          src={Netflixlogo}
          alt='Netflix Logo'
        />
        <img
          onClick={() => navigate("/profile")}
          className='nav_avatar'
          src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.displayname}&backgroundType=gradientLinear,solid&eyes=closed,closed2,crying&mouth=cute,drip,faceMask&randomizeIds=false`}
          alt='Avatar'
        />
      </div>
    </div>
  );
}

export default Nav;
