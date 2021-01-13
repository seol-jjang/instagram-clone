import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsChat } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { VscBookmark } from "react-icons/vsc";
import { palette, ProfileIcon, UserNickname } from "../../../../styles/Theme";
import ImageSlide from "../../../utils/ImageSlide";
import LikeBtn from "../../../utils/LikeBtn";
import LikeNumber from "../../../utils/LikeNumber";
import DetailContent from "./DetailContent";
import Dialog from "../../../utils/Dialog";

function PostSection(props) {
  const { post } = props;
  const [likeNumber, setLikeNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [writer, setWriter] = useState("");

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const onClickMore = (userFrom = "") => {
    setVisible(!visible);
    setWriter(userFrom);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <WriteHeader>
        <div>
          <ProfileIcon size="medium">
            <Link to={`/${post.userFrom.nickname}`}>
              <img
                src={`http://localhost:5000/${post.userFrom.profileImage}`}
                alt={post.userFrom.nickname}
              />
            </Link>
          </ProfileIcon>
          <Link to={`/${post.userFrom.nickname}`}>
            <UserNickname>{post.userFrom.nickname}</UserNickname>
          </Link>
        </div>
        <MoreBtn onClick={() => onClickMore(post.userFrom._id)}>
          <IoIosMore />
        </MoreBtn>
      </WriteHeader>
      <PictureWrap>
        <ImageSlide images={post.filePath} />
      </PictureWrap>
      <div>
        <BtnUtil>
          <div>
            <LikeBtn postId={post._id} refreshLike={refreshLike} />
            <button>
              <Link to={`/p/${post._id}`}>
                <BsChat />
              </Link>
            </button>
          </div>
          <button>
            <VscBookmark />
          </button>
        </BtnUtil>
        <LikeNumber postId={post._id} newLikeNumber={likeNumber} />
        <DetailContent post={post} />
      </div>
      <Dialog
        onClose={onClose}
        visible={visible}
        postId={post._id}
        writer={writer}
      />
    </>
  );
}

export default PostSection;

const WriteHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 15px;
  & > div {
    display: flex;
    align-items: center;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-right: 15px;
  }
`;

const MoreBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const PictureWrap = styled.div`
  position: relative;
  background-color: black;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
`;

const BtnUtil = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  margin: 12px 0 5px;
  button {
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    &:not(:first-child) {
      margin-left: 10px;
    }
    svg {
      width: 25px;
      height: 25px;
    }
    .like-btn {
      padding-top: 2px;
    }
    .like {
      fill: #ff1b3e;
    }
  }
`;
