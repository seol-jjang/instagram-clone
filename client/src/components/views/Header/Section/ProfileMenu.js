import React from "react";
import styled, { keyframes } from "styled-components";

function ProfileMenu(props) {
  const { onClose, children } = props;
  const close = () => {
    onClose();
  };
  return (
    <>
      <Circle />
      <MenuWrapper onClick={close}>
        <Triangle />
        <MenuInner>{children}</MenuInner>
      </MenuWrapper>
      <MenuOverlay onClick={close} />
    </>
  );
}

const slideFade = keyframes`
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }
`;

const MenuWrapper = styled.div`
  z-index: 99;
  position: absolute;
  top: 45px;
  right: -15px;
  outline: 0;
  border-radius: 7px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.09);
  animation: ${slideFade} 0.5s forwards;
`;

const MenuInner = styled.div`
  position: relative;
  width: 230px;
  max-width: 230px;
  border-radius: 7px;
  background-color: white;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Triangle = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  top: -7px;
  right: 20px;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  transform: rotate(45deg);
`;

const Circle = styled.div`
  position: absolute;
  right: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid black;
`;

export default ProfileMenu;
