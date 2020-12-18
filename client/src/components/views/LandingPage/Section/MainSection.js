import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { IoPaperPlaneOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { VscBookmark } from "react-icons/vsc";
import {
  MediumProfileIcon,
  palette,
  UserNickname
} from "../../../../styles/Theme";

function MainSection() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get("/api/post/getPosts").then((response) => {
      if (response.data.success) {
        setPost(response.data.posts);
      } else {
        alert("피드 불러오기를 실패했습니다");
      }
    });
  }, []);

  const renderPosts = post.map((post, index) => (
    <Article key={index}>
      <Writer>
        <MediumProfileIcon>
          <img src={post.userFrom.profileImage} alt={post.userFrom.nickname} />
        </MediumProfileIcon>
        <UserNickname>{post.userFrom.nickname}</UserNickname>
      </Writer>
      <Picture>
        {post.filePath.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${img}`}
            alt={`postImage_${index}`}
          />
        ))}
      </Picture>
      <Description>
        <BtnUtil>
          <div>
            <button>
              <span>
                <IoIosHeartEmpty className="heart-btn" />
              </span>
            </button>
            <button>
              <span>
                <IoChatbubbleOutline />
              </span>
            </button>
            <button>
              <span>
                <IoPaperPlaneOutline />
              </span>
            </button>
          </div>
          <div>
            <button>
              <span>
                <VscBookmark />
              </span>
            </button>
          </div>
        </BtnUtil>
        <Detail>
          <UserNickname>{post.userFrom.nickname}</UserNickname>
          <p>{post.description}</p>
        </Detail>
      </Description>
    </Article>
  ));
  return <Section>{renderPosts}</Section>;
}

export default MainSection;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Article = styled.article`
  border: 1px solid ${palette.borderColor};
  margin-bottom: 60px;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  background-color: white;
  span {
    margin-right: 15px;
  }
`;

const Picture = styled.div`
  background-color: black;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
  img {
    display: block;
    width: 100%;
  }
`;

const Description = styled.div`
  background-color: white;
  margin-bottom: 15px;
`;

const BtnUtil = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  & > div {
    display: flex;
    button {
      padding: 5px;
      cursor: pointer;
      background-color: transparent;
    }
    span {
      display: flex;
      align-items: center;
    }
  }
  svg {
    width: 26px;
    height: 26px;
  }
  .heart-btn {
    width: 28px;
    height: 28px;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
`;
