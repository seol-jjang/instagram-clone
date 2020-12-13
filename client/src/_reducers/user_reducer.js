import { LOGIN_USER } from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (prevState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };
    default:
      return prevState;
  }
}
