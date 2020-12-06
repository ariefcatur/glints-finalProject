import profile from "./img/Ellipse 1.svg";
import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';




const ProfMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
       <img src={profile}></img>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem> <Link to="/profile">View Profile</Link></DropdownItem>
        <DropdownItem> <Link to="/logout">Log Out</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfMenu;