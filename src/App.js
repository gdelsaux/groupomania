import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

//components
import GlobalStyle from "./style/GlobalStyle";
import Navbar from "./components/Navbar";
import LoginForm from "./components/loginPage/LoginForm";
import Admin from "./components/admin/Admin";
import Feed from "./components/main/Feed";
import Update from "./components/admin/UpdateUser";

function App() {
  const [nav, setNav] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <Navbar setNav={setNav} nav={nav} />
      <Switch>
        <Route path="/" exact>
          <LoginForm setNav={setNav} nav={nav} />
        </Route>
        <Route path="/main" component={Feed} />
        <Route path="/admin" component={Admin} />
        <Route path="/updateUser" component={Update} />
      </Switch>
    </Router>
  );
}

export default App;
