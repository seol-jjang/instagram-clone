import React from "react";
import { Link, withRouter } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import RightMenu from "./Section/RightMenu";
import logo from "../../../assets/instagram_logo_small.png";
import { palette, viewportSize } from "../../../styles/Theme";
import styled from "styled-components";

function Header(props) {
  const pathLocation = props.location.pathname;
  if (pathLocation === "/login" || pathLocation === "/accounts") {
    return <></>;
  } else {
    return (
      <HeaderWarp>
        <HeaderInner>
          <Link to="/">
            <Logo src={logo} alt="instagram" />
          </Link>
          {/* <SearchBox>
            <Input type="text" placeholder="검색" search />
          </SearchBox> */}
          <RightMenu />
        </HeaderInner>
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
  padding: 10px 0;
  background-color: #ffffff;
  border-bottom: 1px solid ${palette.borderColor};
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  width: 935px;
  margin: 0 auto;
  @media ${viewportSize.laptop} {
    padding: 0 10px;
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
