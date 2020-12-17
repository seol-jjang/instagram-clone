import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../Theme";

const searchStyle = css`
  ${(props) =>
    props.search &&
    css`
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 3px 10px 3px 26px;
      background-color: #f7f7f7;
      font-size: 15px;
      &::placeholder {
        text-align: center;
      }
      &:focus {
        border: 1px solid ${palette.borderColor};
        &::placeholder {
          color: ${palette.grayText};
          text-align: left;
        }
      }
    `}
`;

const StyleInput = styled.input`
  /* 공통스타일 */
  margin-bottom: 7px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid ${palette.borderColor};
  background-color: ${palette.backgroundGray};
  font-size: 12px;
  outline: none;

  &:focus {
    border: 1px solid #bbb;
  }
  &::placeholder {
    color: ${palette.grayText};
  }

  ${searchStyle}
`;

const Input = React.forwardRef((props, ref) => {
  return (
    <StyleInput ref={ref} {...props}>
      {props.children}
    </StyleInput>
  );
});

export default Input;
