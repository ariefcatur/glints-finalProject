import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

const EditDebt = (props) => {
  const { className } = props;

  const urlDebt = "http://52.148.70.171/debts/notes";

  const [results, setResults] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(urlDebt, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
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
    <div>
      <Button
        size="sm"
        className="mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      ><strong>Edit Note</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <p>Edit your debt record here and then click Confirm to save the changes.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Container>
              <FormGroup>
                <Label for="id">Which note you would like to edit?</Label>
                <Input
                  type="select"
                  name="id"
                  id="id"
                  onChange={(e) => setId(e.target.value)}
                >
                  <option>Select note</option>
                  {results.length !== 0
                    ? results.map((result) => (
                        <option value={result.id}>
                          {result.name} - {result.description}
                        </option>
                    ))
                    : ""}
                </Input>
              </FormGroup>
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
                  onChange={(e) => setDescription(e.target.value)}
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
                  <option>Payables</option>
                  <option>Receivables</option>
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
                  typw="submit"
                  block
                  outline
                  style={{ backgroundColor: "#8F48EA", color: "white" }}
                >
                  <strong>Confirm</strong>
                </Button>
              </FormGroup>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditDebt;
