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
import axios from "axios";
import Cookies from "js-cookie";
import {Trash2} from 'react-feather';

const ShowExpenses = () => {
  const [results, setResults] = useState("");

  const urlCard = "https://binar8-jul-hendri.nandaworks.com/card";

  const token = Cookies.get("token");

  console.log(results);

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

  const handleDelete = (id) => {
    axios
      .delete(`${urlCard}?cardNumber=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return window.location.reload();
      });
  };

  return (
    <>
      {results.length !== 0 ? (
        results.map((result) => (
          <Col md={4} key={result.id}>
            <Card >
              <CardBody className="d-flex flex-column">
                <CardTitle>
                  <strong>{result.cardBank}</strong>
                  <hr style={{ borderTop: "2px solid #222222" }} />
                </CardTitle>
                <CardText>{result.cardNumber}</CardText>
                {/* <CardText>Rp {result.saldo}</CardText> */}
                <CardText>{result.cardHolder}</CardText>
                <Button
                  size="sm"
                  onClick={() => {
                    handleDelete(result.cardNumber);
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
          <p style={{opacity:"60%"}}><i><strong>You have not added any card. Please add card.</strong></i></p>
        </Container>
      )}
    </>
  );
};

export default ShowExpenses;
