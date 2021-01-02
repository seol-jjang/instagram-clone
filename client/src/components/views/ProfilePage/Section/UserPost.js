import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewportSize } from "../../../../styles/Theme";

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
          <Link to={`/p/${post._id}`}>
            <img
              src={`http://localhost:5000/${post.filePath[0]}`}
              alt={index}
            />
          </Link>
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
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  gap: 20px;

  @media ${viewportSize.laptop} {
    gap: 10px;
  }
  @media ${viewportSize.tablet} {
    gap: 1px;
  }
  article {
    max-height: 293px;
    position: relative;
    border: 1px solid #ddd;
    background-color: black;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
