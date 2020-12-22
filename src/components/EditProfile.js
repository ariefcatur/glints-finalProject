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
  const urlEditProfile = " https://binar8-jul-hendri.nandaworks.com/auth/update/";

  const { className } = props;

  const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = Cookies.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      fullName: fullName,
      // email: email,
      password: password
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
          <p>Please update your data and then click Save.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>

            <FormGroup>
              <Label for="fullName">Name</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Input your new name."
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>

            {/* <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Input your new email address."
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
 */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Input your new password."
                onChange={(e) => setPassword(e.target.value)}
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