import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Signup from "./pages/signup";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <Home/>
        </Route>
        <Route exact path={'/login'}>
          <Login/>
        </Route>
        <Route exact path={'/signup'}>
          <Signup/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
