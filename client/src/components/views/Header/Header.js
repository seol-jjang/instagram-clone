import React from "react";
import { Link, withRouter } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import RightMenu from "./Section/RightMenu";
import logo from "../../../assets/instagram_logo_small.png";
import { palette, Inner } from "../../../styles/Theme";
import styled from "styled-components";

function Header(props) {
  const pathLocation = props.location.pathname;
  if (pathLocation === "/login" || pathLocation === "/accounts") {
    return <div></div>;
  } else {
    return (
      <HeaderWarp>
        <Inner className="header__inner">
          <Link to="/">
            <Logo src={logo} alt="instagram" />
          </Link>
          {/* <SearchBox>
            <Input type="text" placeholder="검색" search />
          </SearchBox> */}
          <RightMenu />
        </Inner>
      </HeaderWarp>
    );
  }
}

export default withRouter(Header);

const HeaderWarp = styled.header`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  background-color: #ffffff;
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
  margin-top: 5px;
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
