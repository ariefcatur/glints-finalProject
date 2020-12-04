import React, { useState } from "react";
import "./Signup.css";
import { Modal, ModalHeader, ModalBody, Button, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Axios from "axios";

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

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    const urlSignUp = "http://3.0.91.163/auth/register";
    const bodyData = {
      fullName: fullName,
      email: email,
      password: password,
    };

    fetch(urlSignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("id", result.id);
        localStorage.setItem("fullName", result.fullName);
        localStorage.setItem("email", result.email);
        localStorage.setItem("status", result.status);
        localStorage.setItem("token", result.token);
      })
      .then(() => history.push({Login}));
    // .then((res) => <Alert color="primary">Mantav</Alert>);
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    const urlSignIn = "http://3.0.91.163/auth/login";
    const bodyData = {
      email: email,
      password: password,
    };

    fetch(urlSignIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("fullName", result.fullName);
        localStorage.setItem("email", result.email);
        localStorage.setItem("id", result.id);
        localStorage.setItem("status", result.status);
        localStorage.setItem("token", result.token);
      })
      .then(() => history.push({Dashboard}));
    checker();
  };

  return (
    <div>
      <div className="SignUpModal">
        <div className="navigation">
        
          <a  onClick={toggleSignUp}>
            {buttonLabel}Sign Up
          </a>
        </div>

        <Modal isOpen={modalSignUp} toggle={toggleSignUp} className={className}>
          <ModalHeader toggle={toggleSignUp}>
            <div className="ModalHeader">
              <h4 className="SignTitle">Sign Up For a New Account</h4>
            </div>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitSignUp}>
              <div className="form-group">
                <label id="SignUp">Full Name</label>
                <br />
                <input
                  id="InputSignUp"
                  type="text"
                  className="input-form btn-block"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label id="SignUp">Email</label>
                <br />
                <input
                  id="InputSignUp"
                  type="email"
                  className="input-form btn-block"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label id="SignUp">Password</label>
                <br />
                <input
                  id="InputSignUp"
                  type="password"
                  className="input-form btn-block"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                id="submitButton"
                type="submit"
                className="btn btn-primary btn-block"
              >
                Sign Up
              </button>
              <p className="Login">
                Already have an account?{" "}
                <Button color="primary" onClick={toggleSignIn}>
                  {buttonLabel}Sign In
                </Button>
                {/* <a onClick={toggleSignUp}>Log In</a> */}
              </p>
            </form>
          </ModalBody>
        </Modal>
      </div>

      <div className="SignInModal">
        <Modal isOpen={modalSignIn} toggle={toggleSignIn} className={className}>
          <ModalHeader toggle={toggleSignIn}>
            <div className="ModalHeader"></div>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitSignIn}>
              <div className="form-group">
                <label id="SignUp">Email</label>
                <br />
                <input
                  id="InputSignUp"
                  type="email"
                  className="input-form btn-block"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label id="SignUp">Password</label>
                <br />
                <input
                  id="InputSignUp"
                  type="password"
                  className="input-form btn-block"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                id="submitButton"
                type="submit"
                className="btn btn-primary btn-block"
                onClick={toggleSignIn}
              >
                Sign In
              </button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </div>

    // </div>
  );
};

export default SignUp;
