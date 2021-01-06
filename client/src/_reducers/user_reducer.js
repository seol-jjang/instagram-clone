import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  EDIT_USER,
  EDIT_PASSWORD,
  UPLOAD_USER_IMAGE
} from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (prevState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...prevState, success: action.payload };
    case AUTH_USER:
      return { ...prevState, userData: action.payload };
    case EDIT_USER:
      return { ...prevState, success: action.payload };
    case EDIT_PASSWORD:
      return { ...prevState, success: action.payload };
    case UPLOAD_USER_IMAGE:
      return { ...prevState, success: action.payload };
    default:
      return prevState;
  }
}
