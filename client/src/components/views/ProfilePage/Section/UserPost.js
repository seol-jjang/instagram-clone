import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function UserPost(props) {
  const { profileUser } = props;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const variable = { userFrom: profileUser };
    Axios.post("/api/post/getUserPost", variable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    });
  }, [profileUser]);
  return (
    <PostSection>
      {post.map((post, index) => (
        <article key={index}>
          <img src={`http://localhost:5000/${post.filePath[0]}`} alt={index} />
        </article>
      ))}
    </PostSection>
  );
}

export default UserPost;

const PostSection = styled.div`
  margin-top: 90px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  article {
    position: relative;
    height: 293px;
    border: 1px solid #ddd;
    background-color: black;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
