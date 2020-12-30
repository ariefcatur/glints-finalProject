import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  CardImg,
} from "reactstrap";
import axios from "axios";
import FileUpload from "./UploadImg";
import { Image } from "react-feather";
import Cookies from "js-cookie";

const UploadModal = (props) => {
  const { className } = props;

  const token = Cookies.get("token");

  const [users, setUsers] = useState("");

  useEffect(() => {
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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        size="sm"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
        <Image size={15} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Please choose a picture and then click Save.</ModalHeader>
        <ModalBody>
            {users.length !== 0
              ? users.map((user) => (
                  <CardBody key={user.id} className="cardBody">
                      <Container style={{ textAlign: "center" }}>
                        <CardImg
                          top
                          src={user.photo}
                          at=""
                          style={{width:"50%"}}
                        />
                        <hr style={{ borderTop: "2px solid #c8c8c8" }} />
                      </Container>
                  </CardBody>
                ))
              : ""}
            <FileUpload />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UploadModal;
