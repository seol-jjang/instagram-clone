import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewportSize } from "../../../../styles/Theme";

function UserPost(props) {
  const { profileUser, refreshPostNumber } = props;
  const [post, setPost] = useState([]);
  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    const variable = { userFrom: profileUser };

    Axios.post("/api/post/getUserPost", variable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPost(response.data.post);
            refreshPostNumber(response.data.postLength);
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
  }, [profileUser, refreshPostNumber]);
  return (
    <PostSection>
      {post.map((post, index) => (
        <article key={index}>
          <Link to={`/p/${post._id}`}>
            <img src={`${post.filePath[0]}`} alt={index} />
          </Link>
        </article>
      ))}
    </PostSection>
  );
}

export default UserPost;

const PostSection = styled.div`
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
