import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./Profile.css";

const Debt = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null);
  const [dueDate, setDueDate] = useState("");

  const token = Cookies.get("token");
  const urlDebt = " http://52.148.70.171/debts/add";

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      description: description,
      amount: amount,
      type: type,
      dueDate: dueDate,
    };

    axios
      .post(urlDebt, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        size="sm"
        className="mt-2 mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
        {/* <Plus size={15}/>  */}
        <strong>New Debt Notes</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p>Add debt's information here.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md="12">
                <FormGroup>
                  <Label for="cardType">Name</Label>
                  <Input
                    type="text"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="cardType">Description</Label>
                  <Input
                    type="textarea"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setDescription(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="cardType">Amount</Label>
                  <Input
                    type="number"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setAmount(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="cardType">Type</Label>
                  <Input
                    type="select"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option>Payables</option>
                    <option>Receivables</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="cardType">Due Date</Label>
                  <Input
                    type="date"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setDueDate(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button
                block
                type="submit"
                onClick={toggle}
                style={{ backgroundColor: "#8F48EA", color: "white" }}
              >
                <strong>Add Debt</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Debt;
