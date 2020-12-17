import React from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import RightMenu from "./Section/RightMenu";
import logo from "../../../assets/instagram_logo.png";
import { palette, Inner } from "../../../styles/Theme";
import styled from "styled-components";
import Input from "../../../styles/common/Input";

function Header() {
  return (
    <HeaderWarp>
      <Inner className="header__inner">
        <Link to="/">
          <Logo src={logo} alt="instagram" />
        </Link>
        <SearchBox>
          <Input type="text" placeholder="검색" search />
        </SearchBox>
        <RightMenu />
      </Inner>
    </HeaderWarp>
  );
}

export default Header;

const HeaderWarp = styled.header`
  display: flex;
  justify-content: center;
  padding: 5px 15px;
  border-bottom: 1px solid ${palette.borderColor};
  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  width: 103px;
  height: 100%;
  margin-top: 9px;
`;

const SearchBox = styled.div`
  position: relative;
  min-width: 125px;
  width: 210px;
  height: 28px;
`;

// const FrontSearchBox = styled.div`
//   cursor: text;
//   z-index: 2;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 5px;
//   background-color: #f7f7f7;
//   border: 1px solid ${palette.borderColor};
//   border-radius: 3px;
//   font-size: 15px;
//   color: ${palette.grayText};
// `;
