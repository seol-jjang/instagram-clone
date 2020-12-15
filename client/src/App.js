import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NotFound from "./components/views/NotFound/NotFound";
import Auth from "./hoc/authentication";
import PostUploadPage from "./components/views/PostUploadPage/PostUploadPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />
          <Route exact path="/accounts" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/post/upload"
            component={Auth(PostUploadPage, true)}
          />
          <Route exact path="/main" component={Auth(LandingPage, null)} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
