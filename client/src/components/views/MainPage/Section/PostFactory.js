import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { palette, viewportSize } from "../../../../styles/Theme";
import PostSection from "./PostSection";

function PostFactory() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.get("/api/post/getPosts", { cancelToken: source.token })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPosts(response.data.posts);
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

  return (
    <>
      {posts.map((post, index) => (
        <Article key={index}>
          <PostSection post={post} />
        </Article>
      ))}
    </>
  );
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
