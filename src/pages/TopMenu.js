import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
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

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container fluid className="barnav">
      <Navbar expand="md">
        <NavbarBrand className="lognav" href="/">
          <Link to="/dashboard">
            <img src={subsit}></img>
          </Link>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <Collapse isOpen={isOpen} navbar></Collapse>
          {!checkLogin() && (
            <div className="body">
              <ul id="Menu">
                <li className="liquid1"></li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Product</a>
                </li>
                <li>
                  <Signup />
                </li>
              </ul>
            </div>
          )}
          {checkLogin() && (
            <div>
              <ul id="Menu" className="liquid1">
                <li>
                  <Link to="/history">
                    <img src={chart}></img>
                  </Link>
                </li>
                <li>
                  <img src={app}></img>
                </li>
                <li>
                  <Modals />
                </li>
                <li>
                  <ProfMenu />
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