import React from "react";
import styled from "styled-components";
import { Inner } from "../../../styles/Theme";

const NotFount = () => {
  return (
    <Section>
      <Inner>페이지를 찾을 수가 없습니다</Inner>
    </Section>
  );
};

export default NotFount;

const Section = styled.div`
  margin-top: 80px;
`;
