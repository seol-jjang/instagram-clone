import Axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  EDIT_USER,
  EDIT_PASSWORD,
  UPLOAD_USER_IMAGE,
  REMOVE_USER
} from "./types";

export function loginUser(dataToSubmit) {
  const request = Axios.post("/api/users/login", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: LOGIN_USER,
    payload: request
  };
}
export function registerUser(dataToSubmit) {
  const request = Axios.post("/api/users/register", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function editUser(dataToSubmit) {
  const request = Axios.post("/api/users/edit", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: EDIT_USER,
    payload: request
  };
}

export function editPassword(dataToSubmit) {
  const request = Axios.post("/api/users/editPassword", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: EDIT_PASSWORD,
    payload: request
  };
}

export function uploadUserImage(dataToSubmit, config) {
  const request = Axios.post(
    "/api/users/uploadProfileImage",
    dataToSubmit,
    config
  ).then((response) => response.data);
  return {
    type: UPLOAD_USER_IMAGE,
    payload: request
  };
}

export function auth() {
  const request = Axios.get("/api/users/auth").then(
    (response) => response.data
  );
  return {
    type: AUTH_USER,
    payload: request
  };
}

export function removeUser(dataToSubmit) {
  const request = Axios.post("/api/users/removeUser", dataToSubmit)
    .then((response) => {
      console.log(response);
      return Axios.post("/api/post/removeAllPost", dataToSubmit);
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
  return {
    type: REMOVE_USER,
    payload: request
  };
}
