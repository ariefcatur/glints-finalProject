import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row,
  Button
} from "reactstrap";
import Signup from "./Signup";
import Login from "./Login";
import subsit from "./img/SubsIt..svg";
import "./TopMenu.css";
import Modals from "./Modalender";
import { Link} from "react-router-dom";
import app from "./img/app.svg";
import chart from "./img/Group 11.svg";
import { checkLogin } from "../Helper";
import ProfMenu from "./ProfMenu";
import { Calendar, PieChart } from 'react-feather';
import CalendarEvent from "../components/Calendar";
import Bells from "./Bells";
import AOS from 'aos';

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const featureBox1 = [
    "Sign Up"
  ];

  return (
    <Container fluid className="barnav" style={{backgroundColor:"#fefefe"}}>
      <Navbar expand="sm" style={{backgroundColor:"#fefefe", height:"100px"}}>
      <NavbarBrand className="lognav">
            <Link to="/dashboard">
              <img src={subsit} ></img>
            </Link>
            </NavbarBrand>
        
        <Nav className="ml-auto" navbar>
          <Collapse isOpen={isOpen} navbar></Collapse>
          {!checkLogin() && (
            <div className="body">
              <ul id="Menu">
                <li>
                <a href="#about"><Button id="transparant" >About</Button></a>
                </li>
                <li>
                <a href="#service"><Button id="transparant"> Service </Button></a>
                </li>
                <li>
                <Signup 
                  btnTitle={featureBox1}
                />
                </li>
              </ul>
            </div>
          )}
          {checkLogin() && (
            <div>
              <ul id="Menu" className="liquid1">
                <li>
                  <Link to="/history">
                    <PieChart style={{color:"#8f48ea"}}/>
                  </Link>
                </li>
                <li>
                  <Link to="/Calendar">
                    <Calendar style={{color:"#8f48ea"}}/>
                  </Link>
                </li>
                <li>
                  <Bells />
                </li>
                <li>
                  <ProfMenu/>
                </li>
              </ul>
            </div>
          )}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default TopMenu;
