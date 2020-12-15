import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { Link } from "react-router-dom";
import RightMenu from "./Section/RightMenu";

function Header() {
  return (
    <header>
      <Link to="/main">
        <IoLogoInstagram size="40" />
      </Link>
      <RightMenu />
    </header>
  );
}

export default Header;
