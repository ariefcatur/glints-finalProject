import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { Plus } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

const AddCard = (props) => {

  const urlAddCard = " http://52.148.70.171/card";

  const { className } = props;

  const [cardType, setCardType] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardValid, setCardValid] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardBank, setCardBank] = useState(null);
  const [saldo, setSaldo] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const token = Cookies.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      cardType: cardType,
      cardNumber: cardNumber,
      cardValid: cardValid,
      cvv: cvv,
      cardBank: cardBank,
      saldo: saldo,
      cardHolder: cardHolder,
    };

    console.log(data);

    axios
      .post(urlAddCard, data, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((res) => {
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error) =>{
        console.log(error);
      })
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
        {/* <Plus size={15}/>  */}
        <strong>New Card</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <p>Add new card here.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
              <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cardType">Card Type</Label>
                        <Input
                        type="select"
                        name="cardType"
                        id="cardType"
                        onChange={(e) => setCardType(e.target.value)}
                        >
                            <option>Select card type</option>
                            <option>Master</option>
                            <option>Visa</option>
                        </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cardNumber">Card Number</Label>
                        <Input
                        max="16"
                        type="number"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="•••• •••• •••• ••••"
                        onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="cardValid">Card Expiry</Label>
                        <Input
                        type="cardValid"
                        name="cardValid"
                        id="cardValid"
                        placeholder="•• / ••"
                        onChange={(e) => setCardValid(e.target.value)}
                        />
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="cvv">Card CVC</Label>
                     <Input
                        min="1"
                        max="999"
                        type="number"
                        name="cvv"
                        id="cvv"
                        placeholder="•••"
                        onChange={(e) => setCvv(e.target.value)}
                     />
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cardBank">Bank</Label>
                        <Input
                        type="select"
                        name="cardBank"
                        id="cardBank"
                        onChange={(e) => setCardBank(e.target.value)}
                        >
                          <option>Select Bank</option>
                          <option>BRI</option>
                          <option>Mandiri</option>
                          <option>BNI</option>
                          <option>BCA</option>
                          <option>CIMB Niaga</option>
                          <option>BTN</option>
                          <option>Panin</option>
                          <option>Citibank</option>
                          <option>Other</option>
                        </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="saldo">Balance</Label>
                     <Input
                        type="saldo"
                        name="saldo"
                        id="saldo"
                        placeholder="IDR"
                        onChange={(e) => setSaldo(e.target.value)}
                     />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                    <Label for="cardHolder">Card Holder Name</Label>
                        <Input
                        type="cardHolder"
                        name="cardHolder"
                        id="cardHolder"
                        placeholder="Input card holder's name"
                        onChange={(e) => setCardHolder(e.target.value)}
                    />
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
                <strong>Add New Card</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddCard;