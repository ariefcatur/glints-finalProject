import React, { useState } from "react";
import "./Signup.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
 } from "reactstrap";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = (props) => {
  let history = useHistory();
  const { buttonLabel, className } = props;

  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checker = () => {
    localStorage.getItem("token") === null
      ? setIsLoggedIn(false)
      : setIsLoggedIn(true);
  };

  const toggleSignUp = () => setModalSignUp(!modalSignUp);
  const toggleSignIn = () => {
    setModalSignIn(!modalSignIn);
    setModalSignUp(false);
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
 
  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning"
    })
    const urlSignUp =
      "  https://binar8-jul-hendri.nandaworks.com/auth/register";
    const data = {
      fullName: fullName,
      email: email,
      password: password,
    };

    axios.post(urlSignUp, data)
    .then((ress) => {
      return <Alert color="success">You have registered successfully.</Alert>;
      // console.log(ress.bodyData);
      // <Alert color="primary">Mantav</Alert>;
    })
    .then(() => {
      history.push(toggleSignIn);
    })
    .catch((err) => {
      return console(err);
    })
    // .then((error, data)=>{
    //   // const hasError = "error" in data && data.error != null;
    //   setMessage({
    //     data: error || "Registered Successfully",
    //     type: error ? "alert-danger" : "alert-success",
    //   })
    // })
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    const urlSignIn =
      " https://binar8-jul-hendri.nandaworks.com/auth/login";
    const bodyData = {
      email: email,
      password: password,
    };

    axios.post(urlSignIn, bodyData).then((res) => {
      console.log(res);
      const fullname = res.data.fullName;
      const email = res.data.email;
      const token = res.data.token;
      Cookies.set("fullname", fullname, { expires: 1 });
      Cookies.set("email", email, { expires: 1 });
      Cookies.set("token", token, { expires: 1 });
      setUser(res.data);
      history.push(`/Dashboard`);
    });
  };

  return (
    <div>
      <div className="SignUpModal">
        <div className="navigation">
          <Button onClick={toggleSignUp}  id="transparant">{buttonLabel}Sign Up</Button>
        </div>

        <Modal isOpen={modalSignUp} toggle={toggleSignUp} className={className}>
          <ModalHeader toggle={toggleSignUp}>
            <div className="ModalHeader">
              <h3 className="section">Sign Up</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitSignUp}>
              <FormGroup className="form-group">
                <Label id="SignUp">Full Name</Label>
                <br />
                <Input
                  id="InputSignUp"
                  type="text"
                  color="primary"
                  className="input-form btn-block"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label id="SignUp">Email</Label>
                <br />
                <Input
                  id="InputSignUp"
                  type="email"
                  className="input-form btn-block"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                
              </FormGroup>
              <FormGroup className="form-group">
                <Label id="SignUp">Password</Label>
                <br />
                <Input
                  id="InputSignUp"
                  type="password"
                  className="input-form btn-block"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                id="submitButton"
                background-color="#8F48EA"
                type="submit"
                className="btn btn-block"
                onClick={toggleSignIn}
              >
                Sign Up
              </Button>
              <p className="Login">
                Already have an account?{" "}
                <Button  id="submitButton" onClick={toggleSignIn}>
                  {buttonLabel}Login
                </Button>
                {/* <a onClick={toggleSignUp}>Log In</a> */}
              </p>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      <div className="SignInModal">
        <Modal isOpen={modalSignIn} toggle={toggleSignIn} className={className}>
          <ModalHeader toggle={toggleSignIn}>
            <div className="ModalHeader">
              <h3 className="section">Login</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitSignIn}>
              <FormGroup className="form-group">
                <Label id="SignUp">Email</Label>
                <br />
                <Input
                  id="InputSignUp"
                  type="email"
                  className="input-form btn-block"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label id="SignUp">Password</Label>
                <br />
                <Input
                  id="InputSignUp"
                  type="password"
                  className="input-form btn-block"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                id="submitButton"
                type="submit"
                color="primary"
                className="btn btn-block"
                onClick={toggleSignIn}
              >
                Login
              </Button>
              <p className="Login">
                Don't have an account?{" "}
                <Button id="submitButton" onClick={toggleSignUp}>
                  {buttonLabel}Sign Up
                </Button>
                {/* <a onClick={toggleSignUp}>Log In</a> */}
              </p>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>

    // </div>
  );
};

export default SignUp;
