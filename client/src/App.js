import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NotFound from "./components/views/NotFound/NotFound";
import Auth from "./hoc/authentication";
import PostUploadPage from "./components/views/PostUploadPage/PostUploadPage";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/views/Header/Header";
import { MainContents } from "./styles/Theme";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <MainContents>
            <Route exact path="/" component={Auth(LandingPage, true)} />
            <Route
              exact
              path="/post/upload"
              component={Auth(PostUploadPage, true)}
            />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/accounts"
              component={Auth(RegisterPage, false)}
            />
          </MainContents>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
