import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../styles/common/Button";
import { Inner } from "../../../styles/Theme";
import FileUpload from "../../utils/FileUpload";

function PostUploadPage(props) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user);

  const onTextChange = (event) => {
    const {
      target: { value }
    } = event;
    setDescription(value);
  };
  const updateImages = (newImage) => {
    setImages(newImage);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (images.length === 0) {
      return alert("이미지를 하나 이상 올려야 합니다");
    }
    const postObj = {
      userFrom: user.userData._id,
      description: description,
      filePath: images
    };
    Axios.post("/api/post/uploadPost", postObj).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      } else {
        alert("게시글 업로드에 실패했습니다.");
      }
    });
  };
  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
  };

  return (
    <>
      <Inner>
        <ContentsSection>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <FileUpload refreshFunction={updateImages} />
            <textarea onChange={onTextChange} value={description}></textarea>
            <Button type="submit">게시</Button>
          </form>
          {images.map((image, index) => (
            <img
              src={`http://localhost:5000/${image}`}
              alt={`postImg_${index}`}
              onClick={() => onDelete(image)}
              key={index}
            />
          ))}
        </ContentsSection>
      </Inner>
    </>
  );
}

export default withRouter(PostUploadPage);

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
`;
