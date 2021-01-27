import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewportSize } from "../../../../styles/Theme";

function ScrapSection(props) {
  const [scrap, setScrap] = useState([]);
  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    const variable = { userFrom: props.profileUser };

    Axios.post("/api/scrap/getScrap", variable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setScrap(response.data.scrap);
          } else {
            alert("게시글을 불러오는 데 실패했습니다.");
          }
        }
      })
      .catch(function (e) {
        if (!unmounted) {
          if (Axios.isCancel(e)) {
            console.log("요청 취소: ", e.message);
          } else {
            console.log("오류 발생 ", e.message);
          }
        }
      });
    return function () {
      unmounted = true;
      source.cancel("Canceling in cleanup");
    };
  }, [props.profileUser]);
  return (
    <>
      {scrap.length > 0 ? (
        <Section>
          {scrap.map((post, index) => (
            <article key={index}>
              <Link to={`/p/${post.postId._id}`}>
                <img src={`${post.postId.filePath[0]}`} alt={index} />
              </Link>
            </article>
          ))}
        </Section>
      ) : (
        <EmptySection>
          <p>다른 사람의 게시글을 저장할 수 있습니다.</p>
        </EmptySection>
      )}
    </>
  );
}

export default ScrapSection;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media ${viewportSize.laptop} {
    gap: 10px;
  }
  @media ${viewportSize.tablet} {
    gap: 1px;
  }
  article {
    padding-bottom: 100%;
    position: relative;
    border: 1px solid #ddd;
    background-color: black;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const EmptySection = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
