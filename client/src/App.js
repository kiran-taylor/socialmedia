import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import AuthRouter from "./util/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./component/MenuBar";
import SinglePost from "./pages/SinglePost";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRouter exact path="/login" component={Login} />
        <AuthRouter exact path="/register" component={Register} />
        <Route exact path="/posts/:postid" component={SinglePost} />
      </Router>
    </AuthProvider>
  );
}

export default App;
