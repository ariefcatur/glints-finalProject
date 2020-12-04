import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from "reactstrap";
import Signup from "./Signup";
import Login from "./Login";
import subsit from "./img/SubsIt..svg";
import "./TopMenu.css";


const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container fluid>
      <Navbar color="light" light expand="md">
      <NavbarBrand className="lognav" href="/">
          <img src={subsit}></img>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <Collapse isOpen={isOpen} navbar></Collapse>
          {/* <NavbarBrand href="/">About</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/">Product</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <NavbarBrand><Signup /></NavbarBrand>
           <NavbarToggler onClick={toggle} /> */}
           <div className='body'>
             <ul id='Menu'>
               <li className='liquid1'></li>
               <li><a href='#'>About</a></li>
               <li><a href='#'>Product</a></li>
               <li><Signup /></li>
             </ul>
           </div>
         
        </Nav>
      </Navbar>
    </Container>
  );
};

export default TopMenu;
