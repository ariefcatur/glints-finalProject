import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import {
  Element,
} from 'react-scroll'
import axios from "axios";
import Cookies from "js-cookie";
import {Trash2} from 'react-feather'

const ShowExpenses = () => {
  const [results, setResults] = useState("");

  const urlExpense = "http://3.0.91.163/expense";

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(urlExpense, {
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

  const handleDelete = (id) => {
    axios
      .delete(`http://3.0.91.163/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        return window.location.reload();
      })
    
  } 

  return (
    <>
        
      {results.length !== 0 ? (
        results.map((result) => (
          <Col md={3} key={result.id}>   
            <Card style={{ marginBottom: "15px", minHeight: "165px" }}>
              <CardBody className="d-flex flex-column align-items-center">
                <CardTitle style={{ minHeight: "50px" }}>
                  <strong>{result.title}</strong>
                  <hr style={{ borderTop: "2px solid #222222" }} />
                </CardTitle>
                <CardText>Rp {result.total}</CardText>
                <CardText>{result.purchaseDate}</CardText>
                <Button
                  size="sm"
                  onClick={() => {
                    handleDelete(result.id);
                  }}
                  block
                  color="danger"
                  outline
                >
                  <Trash2 size={20} />
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <Container>
          <p style={{opacity:"60%"}}><i><strong>You have not added any expense.</strong></i></p>
        </Container>
      )}
    </>
  );
};

export default ShowExpenses;
