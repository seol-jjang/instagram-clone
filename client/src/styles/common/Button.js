import React from "react";
import styled from "styled-components";
import { palette } from "../Theme";

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
`;

const Button = ({ children, ...rest }) => {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

export default Button;
