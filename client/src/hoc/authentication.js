import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push(`/main`);
          } else {
            if (option === false) {
              props.history.push(`/main`);
            }
          }
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
