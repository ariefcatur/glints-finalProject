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
import Moment from "react-moment";
import NumberFormat from 'react-number-format';
import swal from "sweetalert2";

const Debt = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(null);
  const [dueDate, setDueDate] = useState("");

  const token = Cookies.get("token");
  const urlDebt = "https://binar8-jul-hendri.nandaworks.com/debts/add";

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
        swal({
          icon: "success",
          title: "Well Done!",
          text: "You record have been added successfully.",
          type: "success",
          buttons: false,
          timer: 3000,
        });  
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // $("input[data-type='currency']").on({
  //   keyup: function() {
  //     formatCurrency($(this));
  //   },
  //   blur: function() { 
  //     formatCurrency($(this), "blur");
  //   }
  // });

  return (
    <div>
      <Button
        size="sm"
        className="mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
        {/* <Plus size={15}/>  */}
        <strong>New Note</strong>
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
                  <Label for="cardType">Amount</Label><br/>
                  <Input
                    type="text"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?IDR" 
                    data-type="currency"
                    name="cardType"
                    id="cardType"
                    onChange={(e) => setAmount(e.target.value)}
                  ></Input>
                  
                  {/* <NumberFormat thousandSeparator={true} prefix={'IDR '} 
                  onChange={(e) => setAmount(e.target.value)}
                  />  */}
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
