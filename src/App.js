import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Profile from './components/Profile.js'
import Footer from './components/Footer.js'
import TopMenu from "./pages/TopMenu";
import Logout from "./pages/Logout";


function App(){
  return(
    <>
     <TopMenu />
     {/* <TopUser /> */}
          {/* <ul>
            <li>
              <Link to="/Dashboard"> Dashboard </Link>
            </li>
            <li>
              <Link to="/History"> History </Link>
            </li>
            <li> 
              <Link to="/Profile"> Profile </Link>
            </li>
            <li>
              <Link to="/Home"> Home </Link>
            </li>
          </ul> */}
    <Switch>
      <Route path ="/dashboard">
        <Dashboard />
      </Route>
      <Route path ="/history">
        <History />
      </Route>
      <Route path ="/profile">
        <Profile />
      </Route>
      <Route path ="/logout">
        <Logout />
      </Route>
      <Route path="/">
            <Home />
      </Route>
    </Switch>
    <Footer/>
    </>
  );
}


export default withRouter(App);
