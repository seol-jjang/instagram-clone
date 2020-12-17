import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../Theme";

const opacityStyle = css`
  ${(props) =>
    props.blur &&
    css`
      opacity: 50%;
      cursor: default;
    `}
`;

const StyleButton = styled.button`
  /* 공통스타일 */
  cursor: pointer;
  margin: 7px 0;
  padding: 7px;
  border-radius: 5px;
  background-color: ${palette.ActivatedColor};
  color: white;
  font-weight: bold;
  font-size: 14px;

  ${opacityStyle}
`;

const Button = React.forwardRef((props, ref) => {
  return (
    <StyleButton ref={ref} {...props}>
      {props.children}
    </StyleButton>
  );
});

export default Button;
