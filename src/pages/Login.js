import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Switch, Route, Link } from "react-router-dom";
import Signup from "./Signup";


const Login = (props) => {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="modal-dialog modal-login">
        <div className="modal-content">
          <div className="model-header">
            <h4 className="modal-title">LOGIN</h4>
            <button className="close"></button>
          </div>
          <div className="modal-body">
            <form method="post">
              <div className="form-group">
                <i className="fa fa-user"></i>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required="required"
                />
              </div>
              <div className="form-group">
                <i className="fa fa-lock"></i>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required="required"
                />
              </div>
              <hr />
              <div className="form-group">
                <Input
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                  value="Login"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Link onClick={toggle}>Don't have an account? Register Here</Link>
          </div>
          <Modal isOpen={modal} toggle={toggle} className="custom-modal-size">
            <ModalBody>
              <Signup />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Login;
