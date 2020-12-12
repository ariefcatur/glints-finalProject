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
import avatar from "../assets/avatar2.png";
import "./Profile.css";
import { User, Mail } from "react-feather";
import Edit from "./EditProfile";
import TabProfile from "./TabProfile";

const Profile = () => {
  const [users, setUsers] = useState("");

  const token = Cookies.get('token');

  useEffect(() => {

    axios
      .get(
        `http://ec2-3-0-91-163.ap-southeast-1.compute.amazonaws.com/auth/user/`, {
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
          <Card>
            {users.length !== 0 ? (
              users.map((user)=> (
                <CardBody key={user.id} className="cardBody">
                <CardImg top src={avatar} at="" className="imgProfile" />
                <Row className="rowright">
                  <Container>
                    <Edit />
                  </Container>
                </Row>
                <CardTitle>
                  <Container>
                    <p>
                      <User size={22} /> {user.fullName}
                    </p>
                  </Container>
                  <Container>
                    <p>
                      <Mail size={22} /> {user.email}
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
