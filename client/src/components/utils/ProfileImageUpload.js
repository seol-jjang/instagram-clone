import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { palette } from "../../styles/Theme";
import { uploadUserImage } from "../../_actions/user_action";

function ProfileImageUpload(props) {
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;

    let formData = new FormData();
    const config = {
      header: { "context-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    dispatch(uploadUserImage(formData, config)).then((response) => {
      if (response.payload.success) {
        window.location.reload();
      } else {
        alert(response.payload.message);
      }
    });
  };
  return (
    <InputWrap htmlFor="profile-file">
      프로필 사진 바꾸기
      <input
        type="file"
        id="profile-file"
        onChange={onFileChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </InputWrap>
  );
}

export default ProfileImageUpload;

const InputWrap = styled.label`
  background-color: transparent;
  color: ${palette.ActivatedColor};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
`;
