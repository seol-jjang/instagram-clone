import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../Theme";

const colorStyle = css`
  ${(props) =>
    props.gray &&
    css`
      background-color: ${palette.backgroundGray};
      color: ${palette.blackColor};
      border: 1px solid ${palette.borderColor};
    `}
`;

const opacityStyle = css`
  ${(props) =>
    props.blur &&
    css`
      opacity: 50%;
      cursor: default;
      pointer-events: none;
    `}
`;

const textStyle = css`
  ${(props) =>
    props.text &&
    css`
      cursor: pointer;
      margin: 0;
      padding-left: 0;
      background-color: transparent;
      color: ${palette.ActivatedColor};
      font-size: 14px;
      font-weight: bold;
    `}
`;

const StyleButton = styled.button`
  /* 공통스타일 */
  cursor: pointer;
  margin: 7px 0;
  padding: 7px;
  border-radius: 4px;
  background-color: ${palette.ActivatedColor};
  color: white;
  font-weight: bold;
  font-size: 14px;

  ${opacityStyle}
  ${colorStyle}
  ${textStyle}
`;

const Button = React.forwardRef((props, ref) => {
  return (
    <StyleButton ref={ref} {...props}>
      {props.children}
    </StyleButton>
  );
});

export default Button;
