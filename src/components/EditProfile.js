import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Edit3 } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Edit = (props) => {
  const urlEditProfile = "http://3.0.91.163/auth/update/";

  const { className } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const token = Cookies.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      fullName: fullName,
      email: email,
    };

    axios
      .patch(urlEditProfile, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setModal(false);
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        size="sm"
        className="mt-2 mr-2 mb-sm-0"
        style={{color: "white", backgroundColor: "#8F48EA"}}
        onClick={toggle}>
        <Edit3 size={15}/>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <p>Please input your data and click Save.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label for="fullName">New Name</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Input your new user name."
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">New Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Input your email address."
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Button
                block
                type="submit"
                style={{ backgroundColor: "#8F48EA", color: "white" }}
              >
                <strong>Save</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Edit;