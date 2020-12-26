import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../components/Profile.css";
import axios from 'axios';
import Cookies from "js-cookie";



const ProfMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState("");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(` https://binar8-jul-hendri.nandaworks.com/auth/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      {user.length !==0 ? (
        user.map((users) => (
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
          >
            <img src={users.photo} alt="" className="thumbnail"></img>
          </DropdownToggle>
        ))
      ) : ("")}
      <DropdownMenu right>
        <Link to="/profile">
          <DropdownItem>View Profile</DropdownItem>
        </Link>
        <Link to="/logout">
          <DropdownItem> Log Out</DropdownItem>
        </Link>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfMenu;
