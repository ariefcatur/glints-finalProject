<<<<<<< HEAD
import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import History from './pages/History'


function App(){
  return(
    <>
          <ul>
            <li>
              <Link to="/Dashboard"> Dashboard </Link>
            </li>
            <li>
              <Link to="/History"> History </Link>
            </li>
            <li>
              <Link to="/Home"> Home </Link>
            </li>
          </ul>
    <Switch>
      <Route path ="/dashboard">
        <Dashboard />
      </Route>
      <Route path ="/history">
        <History />
      </Route>
      <Route path="/">
            <Home />
      </Route>
    </Switch>
    </>
  )
=======
import React from 'react'
import Profile from './components/Profile.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <div className="App">
     <Profile/>
     <Footer/>
    </div>
  );
>>>>>>> origin/profilePage
}

export default withRouter(App);