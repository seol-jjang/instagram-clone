import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FileUpload from "../../utils/FileUpload";
import Header from "../Header/Header";

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

    const postObj = {
      userFrom: user.userData._id,
      description: description,
      filePath: images
    };

    Axios.post("/api/post/uploadPost", postObj).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          props.history.push("/main");
        }, 3000);
      } else {
        alert("게시글 업로드에 실패했습니다.");
      }
    });
  };
  return (
    <>
      <Header />
      <div>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <FileUpload refreshFunction={updateImages} />
          <textarea onChange={onTextChange} value={description}></textarea>
          <button type="submit">게시</button>
        </form>
        {images.map((image, index) => (
          <img
            src={`http://localhost:5000/${image}`}
            alt={`postImg_${index}`}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default withRouter(PostUploadPage);
