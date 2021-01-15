import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../styles/Theme";

function FileUpload(props) {
  const [uploadFile, setUploadFile] = useState([]);

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;

    if (files.length > 10) {
      alert("최대 10장까지 사진을 업로드할 수 있습니다.");
      return;
    }

    let formData = new FormData();
    const config = {
      header: { "context-type": "multipart/form-data" }
    };

    if (uploadFile.length > 0) {
      setUploadFile([...uploadFile, files]);
    } else {
      setUploadFile(files);
    }

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
    <InputWrap>
      이미지 업로드
      <input
        type="file"
        onChange={onFileChange}
        accept="image/png, image/jpeg, image/jpg"
        multiple
      />
    </InputWrap>
  );
}

export default FileUpload;

const InputWrap = styled.label`
  margin-right: 50px;
  background-color: white;
  color: ${palette.ActivatedColor};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
`;
