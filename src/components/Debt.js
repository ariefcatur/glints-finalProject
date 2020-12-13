import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Table,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const Debt = () =>{
    const [debt, setDebt] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState(null);
    const [dueDate, setDueDate] = useState("");

    const url ="http://3.0.91.163/debts/notes"
    const token = Cookies.get("token")
    const urlDebt ="http://3.0.91.163/debts/add"

  
    useEffect(()=>{
        axios
        .get(url, {headers: {Authorization: `Bearer ${token}`}
    })
    .then((res)=>{
        console.log("get debt", (res.data))
        setDebt(res.data);
    })
    .catch((error)=>{
        console.log(error)
    })
    }, []);
    
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    
    const handleSubmit = (e) =>{
      e.preventDefault();

      const data={
        name: name,
        description:description,
        amount: amount,
        type : type,
        dueDate : dueDate,
      };

      axios
      .post(urlDebt, data, {headers: { Authorization: `Bearer ${token}`}})
      .then((res)=>{
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error)=>{
        console.log(error)
      })

    }
    return (
    <Container>
        <Button
        size="sm"
        className="mt-2 mr-2 mb-sm-0"
        style={{color: "white", backgroundColor: "#8F48EA"}}
        onClick={toggle}>
        {/* <Plus size={15}/>  */}
        <strong>Add Debt</strong>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p>Add new Dept here</p>
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
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="cardType">Description</Label>
                        <Input
                        type="textarea"
                        name="cardType"
                        id="cardType"
                        onChange={(e) => setDescription(e.target.value)}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="cardType">Amount</Label>
                        <Input
                        type="number"
                        name="cardType"
                        id="cardType"
                        onChange={(e) => setAmount(e.target.value)}
                        >
                        </Input>
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
                          <option>Account Payable</option>
                          <option>Account Receivable</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="cardType">Due Date</Label>
                        <Input
                        type="date"
                        name="cardType"
                        id="cardType"
                        onChange={(e) => setDueDate(e.target.value)}
                        >
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
                <strong>Add New Card</strong>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
        <Row>
        {debt.map((debts)=>(
        <Col xs="12" key={debts.id}>
        <Table hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Dept Type</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{debts.dueDate}</td>
                    <td>{debts.name},{debts.description}</td>
                    <td>{debts.amount}</td>
                </tr>
            </tbody>
        </Table>
        </Col>
        ))}   
        </Row>
    </Container>

    )
    }   
export default Debt;