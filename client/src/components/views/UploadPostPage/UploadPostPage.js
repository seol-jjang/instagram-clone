import Axios from "axios";
import React, { useState } from "react";
import Header from "../Header/Header";

function UploadPost() {
  const [attachment, setAttachment] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState("");

  const onTextChange = (event) => {
    const {
      target: { value }
    } = event;
    setDescription(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    setAttachment(files);
  };
  const onAttachmentSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    const config = {
      header: { "context-type": "multipart/form-data" }
    };
    for (let i = 0; i < attachment.length; i++) {
      formData.append("attachment", attachment[i]);
    }
    Axios.post("/api/post/uploadImage", formData, config).then((response) => {
      if (response.data.success) {
        const images = response.data.images;
        for (let i = 0; i < images.length; i++) {
          const imgObj = {
            url: images[i].path,
            fileName: images[i].filename
          };
          setUploadedImages([...uploadedImages, imgObj]);
        }
      } else {
        alert("이미지를 업로드하는 데 실패했습니다");
      }
    });
  };

  return (
    <>
      <Header />
      <div>
        <form onSubmit={onAttachmentSubmit} encType="multipart/form-data">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            name="attachment"
            multiple
          />
          <textarea onChange={onTextChange} value={description}></textarea>
          <button type="submit">게시</button>
        </form>
      </div>
    </>
  );
}

export default UploadPost;
