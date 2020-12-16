import Axios from "axios";
import React from "react";

function FileUpload(props) {
  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;

    let formData = new FormData();
    const config = {
      header: { "context-type": "multipart/form-data" }
    };
    for (let i = 0; i < files.length; i++) {
      formData.append("attachment", files[i]);
    }
    Axios.post("/api/post/uploadImage", formData, config).then((response) => {
      if (response.data.success) {
        const images = response.data.path;
        props.refreshFunction(images);
      } else {
        alert("이미지를 업로드하는 데 실패했습니다");
      }
    });
  };
  return (
    <>
      <input type="file" onChange={onFileChange} accept="image/*" multiple />
    </>
  );
}

export default FileUpload;