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
import Cookies from "js-cookie";
import "./Profile.css";
import { User, Mail } from "react-feather";
import Edit from "./EditProfile";
import TabProfile from "./TabProfile";
import FileUpload from "./UploadImg";

const Profile = () => {
  const [users, setUsers] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    document.body.style.backgroundColor = "#E5E5E5";

    axios
      .get(` https://binar8-jul-hendri.nandaworks.com/auth/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="profile">
      <Row>
        <Col xl="4" sm="12">
          <Card id="profilecard">
            {users.length !== 0
              ? users.map((user) => (
                  <CardBody key={user.id} className="cardBody">
                    <Row>
                      <Container>
                        <CardImg
                          top
                          src={user.photo}
                          at=""
                          className="imgProfile"
                        />
                        <FileUpload />
                        <hr style={{ borderTop: "2px solid #c8c8c8" }} />
                      </Container>
                    </Row>
                    <CardTitle>
                      <Container style={{textAlign:"center"}}>
                        <h5>
                          <b>{user.fullName}</b>
                        </h5>
                        <p>
                          <strong>{user.email}</strong>
                        </p>
                      </Container>
                      <Container style={{textAlign:"center"}}>
                      </Container>
                    </CardTitle>
                    <Row className="rowright">
                      <Container>
                        <Edit />
                      </Container>
                    </Row>
                  </CardBody>
                ))
              : ""}
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
