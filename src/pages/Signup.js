import React, { useState } from "react";
import "./Signup.css";
import { Modal, ModalHeader, ModalBody, Button, Alert } from "reactstrap";
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

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    const urlSignUp = " http://ec2-3-0-91-163.ap-southeast-1.compute.amazonaws.com/auth/register";
    const bodyData = {
      fullName: fullName,
      email: email,
      password: password,
    };

    axios.post(urlSignUp, bodyData).then((ress)=>{
      console.log(ress.bodyData);
      history.push({toggleSignIn});
      // <Alert color="primary">Mantav</Alert>;
    })
  };


  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    const urlSignIn = "http://ec2-3-0-91-163.ap-southeast-1.compute.amazonaws.com/auth/login";
    const bodyData = {
      email: email,
      password: password,
    };

    axios.post(urlSignIn, bodyData).then((res)=>{
      console.log(res);
      const email = res.data.email;
      const token = res.data.token;
      Cookies.set('email', email,{expires:1});
      Cookies.set('token', token,{expires:1});
      history.push("/Dashboard");
    })
      
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
                  {buttonLabel}Login
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
                Login
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