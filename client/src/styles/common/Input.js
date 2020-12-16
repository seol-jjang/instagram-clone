import React from "react";
import styled from "styled-components";
import { palette } from "../Theme";

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
`;

const Input = React.forwardRef((props, ref) => {
  return (
    <StyleInput ref={ref} {...props}>
      {props.children}
    </StyleInput>
  );
});

// const Input = ({ children, ...rest }) => {
//
// };

export default Input;
