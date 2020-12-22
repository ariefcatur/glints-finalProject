import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from "axios";
import Cookies from 'js-cookie';
import avatar from "../pages/img/circle3.png";
import "./Profile.css";
import { User, Mail } from "react-feather";
import Edit from "./EditProfile";
import TabProfile from "./TabProfile";

const Profile = () => {
  const [users, setUsers] = useState("");

  const token = Cookies.get('token');

  useEffect(() => {

    document.body.style.backgroundColor = "#E5E5E5"

    axios
      .get(
        ` https://binar8-jul-hendri.nandaworks.com/auth/user/`, {
            headers: {Authorization : `Bearer ${token}`}
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
      console.log(error);
      })
  }, []);

  return (
    <Container className="profile">
      <Row>
        <Col xl="4" sm="12">
        <Card id="cardphoto">
        <CardImg top src={avatar} at="" className="imgProfile" />
        </Card>
          <Card id="profilecard">
            {users.length !== 0 ? (
              users.map((user)=> (
                <CardBody key={user.id} className="cardBody">
               
                <Row className="rowright">
                  <Container>
                    <Edit />
                  </Container>
                </Row>
                <CardTitle>
                  <Container>
                    <p>
                      <User size={22} /> <b>{user.fullName}</b>
                    </p>
                  </Container>
                  <Container>
                    <p>
                      <Mail size={22} /> <strong>{user.email}</strong>
                    </p>
                  </Container>
                </CardTitle>
              </CardBody>
              ))
            ) : (
              ""
            )}
          </Card>
        </Col>
        <Col xl="8" sm="12">
          <TabProfile />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
