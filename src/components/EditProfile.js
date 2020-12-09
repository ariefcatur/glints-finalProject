import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const urlEditProfile = "https://5fad41ff2ec98b00160481c3.mockapi.io/movie/register";

  const history = useHistory();

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
      .put(urlEditProfile, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { username, role, token } = res.data;
        Cookies.set("username", username);
        Cookies.set("role", role);
        Cookies.set("token", token);
      })
      .then(() => {
        setModal(false);
        console.log(props);
        props.setIsLogin(true);
        history.push("/");
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
              <Label for="fullName">User Name</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Input your new user name."
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
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