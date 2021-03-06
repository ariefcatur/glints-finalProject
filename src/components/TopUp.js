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

const TopUp = (props) => {
  const { className } = props;

  const urlCard = " https://binar8-jul-hendri.nandaworks.com/card";

  const [results, setResults] = useState("");
  const [saldo, setSaldo] = useState(null);
  const [cardNumber, setCardNumber] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(urlCard, {
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

    e.preventDefault()

    const data = {
      saldo: parseInt(saldo),
    };

    // axios
    //   .patch(`https://binar8-jul-hendri.nandaworks.com/card?cardNumber=${cardNumber}`, data, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    axios({
      method: 'PATCH',
      url: `https://binar8-jul-hendri.nandaworks.com/card?cardNumber=${cardNumber}`,
      headers: { Authorization: `Bearer ${token}` },
      data: data,
    })
      .then((res) => {
        console.log(res);
        console.log("ini res.data top up");
        console.log(res.data);
        // return window.location.reload();
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        size="sm"
        className="mt-2 mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
        <strong>Top-up</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <p>Top-up your balance here.</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Container>
              <FormGroup>
                <Label for="cardNumber">Select Card</Label>
                <Input
                  type="select"
                  name="cardNumber"
                  id="cardNumber"
                  onChange={(e) => setCardNumber(e.target.value)}
                >
                  <option>Select card</option>
                  {results.length !== 0
                    ? results.map((result) => (
                        <option value={result.cardNumber}>
                          {result.cardBank} - IDR {result.saldo}
                        </option>
                      ))
                    : ""}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="saldo">Top-up amount:</Label>
                <Input
                  type="select"
                  name="saldo"
                  id="saldo"
                  onClick={(e) => setSaldo(e.target.value)}
                >
                  <option>Select amount</option>
                  <option>50000</option>
                  <option>100000</option>
                  <option>250000</option>
                  <option>500000</option>
                  <option>1000000</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Button
                  size="sm"
                  type="submit"
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

export default TopUp;
