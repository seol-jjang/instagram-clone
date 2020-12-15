import React, { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import Header from "../Header/Header";

function UploadPost() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const onTextChange = (event) => {
    const {
      target: { value }
    } = event;
    setDescription(value);
  };
  const onAttachmentSubmit = (event) => {
    event.preventDefault();
  };
  const updateImages = (newImage) => {
    setImages(newImage);
  };
  return (
    <>
      <Header />
      <div>
        <form onSubmit={onAttachmentSubmit} encType="multipart/form-data">
          <FileUpload refreshFunction={updateImages} />
          <textarea onChange={onTextChange} value={description}></textarea>
          <button type="submit">게시</button>
        </form>
        {images.map((image, index) => (
          <img
            src={`http://localhost:5000/uploads/${image}`}
            alt={`postImg_${index}`}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default UploadPost;
