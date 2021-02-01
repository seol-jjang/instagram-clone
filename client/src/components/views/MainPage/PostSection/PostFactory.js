import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { palette, viewportSize } from "../../../../styles/Theme";
import PostSection from "./PostSection";

function PostFactory() {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.get("/api/post/getFollowingPosts", { cancelToken: source.token })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPosts(response.data.posts);
            setLoad(true);
          } else {
            alert("피드 불러오기를 실패했습니다");
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
  }, []);

  if (load) {
    if (posts.length > 0) {
      return (
        <>
          {posts.map((post, index) => (
            <Article key={index}>
              <PostSection post={post} />
            </Article>
          ))}
        </>
      );
    } else {
      return (
        <EmptySection>
          <h2>피드가 조용해요..</h2>
          <p>새로운 게시글을 작성해보세요.</p>
        </EmptySection>
      );
    }
  } else {
    return <EmptySection></EmptySection>;
  }
}

export default PostFactory;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.borderColor};
  background-color: white;
  margin-bottom: 60px;

  @media ${viewportSize.tablet} {
    border: 0;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
`;

const EmptySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  h2 {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
