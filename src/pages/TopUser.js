import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col,
} from "reactstrap";
import Signup from "./Signup";
import Modals from "./Modalender";
import profile from "./img/Ellipse 1.svg";
import app from "./img/app.svg";
import chart from "./img/Group 11.svg";
import subsit from "./img/SubsIt..svg";
import "./TopUser.css";



const TopUser = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container class="fixed-top" id="header" fluid>
      <Navbar color="light" light expand="md">
          
        <NavbarBrand className="lognav" href="/">
          <img src={subsit}></img>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <Collapse isOpen={isOpen} navbar></Collapse>
          <NavbarBrand href="/"><img src={chart}></img></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/"> <img src={app}></img></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand ><Modals /></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/"> <img src={profile}></img></NavbarBrand>
          
        </Nav>
      </Navbar>
    </Container>
  );
};

export default TopUser;
