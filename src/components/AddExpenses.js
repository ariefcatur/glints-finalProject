import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { ShoppingCart } from "react-feather";
import './Profile.css'
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
  Col,
} from "reactstrap";

const AddExpenses = (props) => {
  const urlExpense = "http://3.0.91.163/expense";

  const urlCard = "http://3.0.91.163/card";

  const token = Cookies.get("token");

  const { className } = props;

  const [cards, setCards] = useState("");

  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [cardId, setCardId] = useState(null);

  // const [expenseDescription, setExpenseDescription] = useState("");

  useEffect(() => {
    axios
      .get(urlCard, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      total: total,
      purchaseDate: purchaseDate,
      cardId: cardId,
      categoryId: "0d248046-561f-4776-9bc3-239c8c1958dd",
    };

    console.log(data);

    axios
      .post(urlExpense, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        // return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="expense">
      <Button
        size="l"
        className="mt-2 mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
      Add Expense 
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <p>Add New Expenses</p>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Expense Type</Label>
                  <Input
                    type="select"
                    name="title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option>Selec Expense</option>
                    <option>Housing</option>
                    <option>Transportation</option>
                    <option>Food and Beverages</option>
                    <option>Utility Bills</option>
                    <option>Cell Phone</option>
                    <option>Childcare and School Cost</option>
                    <option>Pet food</option>
                    <option>Pet Insurance</option>
                    <option>Clothing</option>
                    <option>Health Insurance</option>
                    <option>Fitness</option>
                    <option>Auto Insurance</option>
                    <option>Life Insurance</option>
                    <option>Home Insurance</option>
                    <option>Fun Stuff</option>
                    <option>Student Loans</option>
                    <option>Retirement</option>
                    <option>Emergency Fund</option>
                    <option>Large Purchases</option>
                    <option>Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="total">Paid amount</Label>
                  <Input
                    type="total"
                    name="total"
                    id="total"
                    placeholder="IDR"
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="purchaseDate">Purchase Date</Label>
                  <Input
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    placeholder="IDR"
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="cardId">Select Card</Label>
                  <Input
                    type="select"
                    name="cardId"
                    id="cardId"
                    onChange={(e) => setCardId(e.target.value)}
                  >
                  {cards.length !== 0
                    ? cards.map((card) => <option>{card.id}</option>)
                    : ("")}
                  </Input>
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
                <strong>Add New Expense</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddExpenses;
