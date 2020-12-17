import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
 } from "reactstrap";
import { X, Edit3 } from "react-feather";
import "./Profile.css";
import debtPic from "../assets/debt2.png";

const ShowDebt = () => {
  const [debt, setDebt] = useState([]);

  const url = "http://52.148.70.171/debts/notes";
  const token = Cookies.get("token");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        setDebt(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(` http://52.148.70.171/debts/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        return window.location.reload();
      });
  };

  const handleSubmit = (id) => {
    const data = {
      name: name,
      description: description,
      amount: amount,
      type: type,
      dueDate: dueDate,
    };

    axios
      .patch(`http://52.148.70.171/debts/update?id=${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Container>
      <Row className="tables">
        <Col xs="12">
          <Table hover style={{ backgroundColor: "whitesmoke" }}>
            <thead
              className="text-center"
              style={{ backgroundColor: "#BA8FF2" }}
            >
              <tr>
                <th>Due Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            {debt.length !== 0 ? (
              debt.map((debts) => (
                <tbody style={{ justifyContent: "center" }}>
                  <tr className="text-center">
                    <td style={{ paddingTop: "16px" }}>{debts.dueDate}</td>
                    <td style={{ paddingTop: "16px" }}>{debts.name}</td>
                    <td style={{ paddingTop: "16px" }}>{debts.description}</td>
                    <td style={{ paddingTop: "16px" }}>{debts.type}</td>
                    <td style={{ paddingTop: "16px" }}>{debts.amount}</td>
                    <td>
                      <Row style={{ justifyContent: "center" }}>
                        <Button
                          size="sm"
                          className="mr-2 mb-sm-0"
                          style={{ color: "white", backgroundColor: "#8F48EA" }}
                          onClick={toggle}
                        >
                          <Edit3 size={15} />
                        </Button>
                        <Modal
                          isOpen={modal}
                          toggle={toggle}
                        >
                          <ModalHeader toggle={toggle}>
                            <p>Edit Debt</p>
                          </ModalHeader>
                          <ModalBody>
                            <Form onSubmit={handleSubmit}>
                              <Container>
                                <FormGroup>
                                  <Label for="name">Name</Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                  ></Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="description">Description</Label>
                                  <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  ></Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="amount">Amount</Label>
                                  <Input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    onChange={(e) => setAmount(e.target.value)}
                                  ></Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="type">Type</Label>
                                  <Input
                                    type="select"
                                    name="type"
                                    id="type"
                                    onChange={(e) => setType(e.target.value)}
                                  >
                                    <option>Select Type</option>
                                    <option>Payable</option>
                                    <option>Receivable</option>
                                  </Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="dueDate">Due Date</Label>
                                  <Input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    onChange={(e) => setDueDate(e.target.value)}
                                  ></Input>
                                </FormGroup>
                                <FormGroup>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      handleSubmit(debts.id);
                                    }}
                                    block
                                    outline
                                    style={{
                                      backgroundColor: "#8F48EA",
                                      color: "white",
                                    }}
                                  >
                                    <strong>Confirm</strong>
                                  </Button>
                                </FormGroup>
                              </Container>
                            </Form>
                          </ModalBody>
                        </Modal>

                        <Button
                          size="sm"
                          className="mr-2 mb-sm-0"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to remove this item?"
                              )
                            )
                              handleDelete(debts.id);
                          }}
                          color="danger"
                          outline
                        >
                          <X size={15} />
                        </Button>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <Container>
                      <p style={{ opacity: "60%" }}>
                        <i>
                          <strong>No record found.</strong>
                        </i>
                      </p>
                      <Col className="subs5">
                        <img
                          src={debtPic}
                          alt=""
                          style={{
                            width: "70%",
                            opacity: "0%",
                            position: "center",
                          }}
                        />
                      </Col>
                    </Container>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default ShowDebt;
