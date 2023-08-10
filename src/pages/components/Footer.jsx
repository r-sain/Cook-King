import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="hpNavbar" style={{zIndex:"1000", position:"fixed", bottom:"0", background:"white"}}>
        <span>
          <Link to="/homepage">
            <AiFillHome color="#E23E3E" />
          </Link>
        </span>
        <span>
          <Link to="/homepage/saved">
            <BsFillBookmarkFill color="#E23E3E" />
          </Link>
        </span>
        <span>
          <Link to="/homepage/profile">
            <FaUser color="#E23E3E" />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
