import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedPage from "./components/views/MainPage/FeedPage";
import ExplorePage from "./components/views/ExplorePage/ExplorePage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NotFound from "./components/views/NotFound/NotFound";
import Auth from "./hoc/authentication";
import PostUploadPage from "./components/views/PostUploadPage/PostUploadPage";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/views/Header/Header";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";
import PostDetailPage from "./components/views/PostDetailPage/PostDetailPage";
import { MainContents } from "./styles/Theme";
import ProfileEditPage from "./components/views/ProfileEditPage/ProfileEditPage";
import PasswordEdit from "./components/views/ProfileEditPage/Section/PasswordEdit";
import RemoveAccount from "./components/views/ProfileEditPage/Section/RemoveAccount";
const { Kakao } = window;

function App() {
  useEffect(() => {
    const naverScript = document.createElement("script");
    const kakaoScript = document.createElement("script");
    naverScript.src =
      "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
    kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";

    naverScript.async = true;
    kakaoScript.async = true;

    document.body.appendChild(naverScript);
    document.body.appendChild(kakaoScript);

    if (!Kakao.Auth) {
      Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <MainContents>
            <Switch>
              <Route exact path="/" component={Auth(FeedPage, true)} />
              <Route
                exact
                path="/explore"
                component={Auth(ExplorePage, null)}
              />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route
                exact
                path="/accounts"
                component={Auth(RegisterPage, false)}
              />
              <Route
                exact
                path="/accounts/remove"
                component={Auth(RemoveAccount, true)}
              />
              <Route
                exact
                path="/accounts/edit"
                component={Auth(ProfileEditPage, true)}
              />
              <Route
                exact
                path="/accounts/password/change"
                component={Auth(PasswordEdit, true)}
              />
              <Route
                exact
                path="/post/upload"
                component={Auth(PostUploadPage, true)}
              />
              <Route
                exact
                path="/:nickname"
                component={Auth(ProfilePage, null)}
              />
              <Route
                exact
                path="/p/:postId"
                component={Auth(PostDetailPage, null)}
              />
            </Switch>
            <Route exact path="/not-found" component={Auth(NotFound, null)} />
          </MainContents>
        </Switch>
      </Router>
    </>
  );
}

export default App;
