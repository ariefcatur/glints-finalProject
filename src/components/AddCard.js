import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Plus } from 'react-feather'
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
  const urlLogin = "https://5fad41ff2ec98b00160481c3.mockapi.io/movie/register";

  const history = useHistory();

  const { className } = props;

  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardBank, setCardBank] = useState("");
  const [cardBalance, setCardBalance] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      cardType: cardType,
      cardNumber: cardNumber,
      cardExpiry: cardExpiry,
      cardCVC: cardCVC,
      cardBank: cardBank,
      cardBalance: cardBalance,
      cardHolder: cardHolder,
    };

    axios
      .post(urlLogin, data)
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
        <Plus size={15}/>
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
                        id="carType"
                        onChange={(e) => setCardType(e.target.value)}
                        >
                            <option>Master</option>
                            <option>Visa</option>
                        </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cardNumber">Card Number</Label>
                        <Input
                        type="cardNumber"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="•••• •••• •••• ••••"
                        onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="cardExpiry">Card Expiry</Label>
                        <Input
                        type="cardExpiry"
                        name="cardExpiry"
                        id="cardExpiry"
                        placeholder="•• / ••"
                        onChange={(e) => setCardExpiry(e.target.value)}
                        />
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="cardCVC">Card CVC</Label>
                     <Input
                        type="cardCVC"
                        name="cardCVC"
                        id="cardCVC"
                        placeholder="••••"
                        onChange={(e) => setCardCVC(e.target.value)}
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
                          <option>BRI</option>
                          <option>MAndiri</option>
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
                    <Label for="cardBalance">Balance</Label>
                     <Input
                        type="cardBalance"
                        name="cardBalance"
                        id="cardBalance"
                        placeholder="IDR"
                        onChange={(e) => setCardBalance(e.target.value)}
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