import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Inner, viewportSize } from "../../../styles/Theme";

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.get("/api/post/getPosts", { cancelToken: source.token })
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
    return (
      <Inner>
        <PostSection>
          {posts.map((post, index) => (
            <article key={index}>
              <Link to={`/p/${post._id}`}>
                <img src={`${post.filePath[0]}`} alt={index} />
              </Link>
            </article>
          ))}
        </PostSection>
      </Inner>
    );
  } else {
    return <div></div>;
  }
}

export default ExplorePage;

const PostSection = styled.div`
  position: relative;
  margin-top: 85px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media ${viewportSize.laptop} {
    gap: 10px;
  }
  @media ${viewportSize.tablet} {
    gap: 1px;
    margin-top: 55px;
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
