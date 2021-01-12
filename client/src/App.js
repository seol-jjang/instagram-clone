import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/views/MainPage/MainPage";
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

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <MainContents>
            <Route exact path="/" component={Auth(MainPage, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/accounts"
              component={Auth(RegisterPage, false)}
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
            <Route exact path="/not-found" component={Auth(NotFound, null)} />
          </MainContents>
        </Switch>
      </Router>
    </>
  );
}

export default App;
