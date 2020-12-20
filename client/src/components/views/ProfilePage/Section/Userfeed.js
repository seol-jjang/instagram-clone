import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Userfeed(props) {
  const { profileUser, postCountUpdate } = props;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const variable = { userFrom: profileUser._id };
    Axios.post("/api/post/getUserPost", variable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
        postCountUpdate(response.data.postLength);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    });
  }, [postCountUpdate, profileUser._id]);
  return (
    <Feed>
      {post.map((post, index) => (
        <article key={index}>
          <img src={`http://localhost:5000/${post.filePath[0]}`} alt={index} />
        </article>
      ))}
    </Feed>
  );
}

export default Userfeed;

const Feed = styled.section`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  article {
    position: relative;
    height: 293px;
    border: 1px solid #ddd;
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
