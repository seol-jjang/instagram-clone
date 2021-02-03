import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Inner } from "../../../styles/Theme";

const NotFound = () => {
  return (
    <Section>
      <Inner>
        <h2>죄송합니다. 페이지를 사용할 수 없습니다.</h2>
        <p>
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
          <Link to="/">Instagram으로 돌아가기</Link>
        </p>
      </Inner>
    </Section>
  );
};

export default NotFound;

const Section = styled.div`
  margin-top: 150px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    text-align: center;
    word-break: keep-all;
    h2 {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    a {
      font-size: 16px;
      color: #003569;
    }
  }
`;
