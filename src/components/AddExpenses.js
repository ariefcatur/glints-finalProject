import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ShoppingCart } from 'react-feather'
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

const AddExpenses = (props) => {
  const urlLogin = "https://5fad41ff2ec98b00160481c3.mockapi.io/movie/register";

  const history = useHistory();

  const { className } = props;

  const [expenseType, setExpenseType] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      expenseType: expenseType,
      paidAmount: paidAmount,
      expenseDescription: expenseDescription,
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
        <ShoppingCart size={15}/>
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
                      <Label for="expenseType">Expense Type</Label>
                        <Input
                        type="select"
                        name="expensetype"
                        id="expenseType"
                        onChange={(e) => setExpenseType(e.target.value)}
                        >
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
                    <Label for="paidAmount">Balance</Label>
                     <Input
                        type="paidAmount"
                        name="paidAmount"
                        id="paidAmount"
                        placeholder="IDR"
                        onChange={(e) => setPaidAmount(e.target.value)}
                     />
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                    <Label for="expenseDescription">Card Holder Name</Label>
                        <Input
                        type="textarea"
                        name="expenseDescription"
                        id="expenseDescription"
                        placeholder="Write your details of expense here."
                        onChange={(e) => setExpenseDescription(e.target.value)}
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