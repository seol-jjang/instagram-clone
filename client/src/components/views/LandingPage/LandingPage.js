import Axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Inner, MainContents } from "../../../styles/Theme";
import Header from "../Header/Header";

const LandingPage = (props) => {
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
    <article key={index}>
      <h4>{post.userFrom.nickname}</h4>
      {post.filePath.map((img, index) => (
        <img
          key={index}
          src={`http://localhost:5000/${img}`}
          alt={`postImage_${index}`}
        />
      ))}
      <p>{post.description}</p>
    </article>
  ));
  return (
    <>
      <MainContents>
        <Inner>
          <section>{renderPosts}</section>
        </Inner>
      </MainContents>
    </>
  );
};

export default withRouter(LandingPage);
