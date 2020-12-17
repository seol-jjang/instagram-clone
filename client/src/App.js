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

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/accounts" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/post/upload"
            component={Auth(PostUploadPage, true)}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
