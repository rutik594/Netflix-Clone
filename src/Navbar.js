import React, { useEffect,useState } from "react";
import "./Navbar.css";
function Navbar() {
    const [show,handleShow]=useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
      return () => {
          window.removeEventListener('scroll')
      }
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
      ></img>
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/00js_UI_icon_userAvatar-constructive.svg/480px-00js_UI_icon_userAvatar-constructive.svg.png"
      ></img>
    </div>
  );
}

export default Navbar;
