import React, {useState, useEffect} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from 'axios'
import avatar from "../assets/avatar2.png";
import "./Profile.css";
import { User, Mail, MapPin, Smile } from "react-feather";
import Edit from "./EditProfile";
import TabProfile from "./TabProfile";

const Profile = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    axios.get("http://3.0.91.163/auth/user").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  return (
    <Container className="profile">
      <Row>
        <Col xl="4" sm="12">
          <Card>
            {users.map(user => {
              <CardBody className="cardBody">
                <CardImg top src={avatar} at="" className="imgProfile" />
                <Row className="rowright">
                  <Container>
                    <Edit />
                  </Container>
                </Row>
                <CardTitle>
                  <Container>
                    <p>
                      <User size={22} /> {user.fullname}
                    </p>
                  </Container>
                  <Container>
                    <p>
                      <Smile size={22} /> {user.id}
                    </p>
                  </Container>
                  <Container>
                    <p>
                      <Mail size={22} /> {user.email}
                    </p>
                  </Container>
                  <Container>
                    <p>
                      <MapPin size={22} /> Bandung
                    </p>
                  </Container>
                </CardTitle>
              </CardBody>
            })}
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
