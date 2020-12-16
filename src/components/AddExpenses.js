import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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

  const urlExpense = " http://52.148.70.171/expense";

  const urlCard = " http://52.148.70.171/card";

  const urlCategories = " http://52.148.70.171/categories";

  const token = Cookies.get("token");

  const { className } = props;

  const [cards, setCards] = useState("");

  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [cardId, setCardId] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState("");

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

      axios
      .get(urlCategories)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
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
      categoryId: categoryId
    };
    
    axios
      .post(urlExpense, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
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
        className="mt-2 mr-2 mb-sm-0"
        style={{ color: "white", backgroundColor: "#8F48EA" }}
        onClick={toggle}
      >
      <strong>New Expense </strong>
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
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
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
                  <Label for="categoryId">Expense Type</Label>
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                  {categories.length !== 0
                    ? categories.map((category) => <option value={category.id}>{category.category}</option>)
                    : ("")}
                  </Input>
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
                    <option>Select card</option>
                  {cards.length !== 0
                    ? cards.map((card) => <option value={card.id}>{card.cardBank}</option>)
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
