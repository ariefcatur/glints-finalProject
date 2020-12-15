import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import Loading from './Loading'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import visa from "../assets/visa.png";
import master from "../assets/mastercard.png";
import "./Profile.css";
import expense from "../assets/expense.png";

function CheckStatus() {
  const [results, setResults] = useState("");
  // const [loading, setLoading] = useState(false);

  const urlCard = "http://3.0.91.163/card";

  const token = Cookies.get("token");

  console.log(results);

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

  useEffect(() => {
    axios
      .get(urlCard, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        // setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {results.length !== 0 ? (
          results.map((result) => {
            if (result.saldo >= 1000000 && result.cardType === "Master") {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={master}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "blue" }}> Sufficient</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (result.saldo >= 1000000 && result.cardType === "Visa") {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={visa}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "blue" }}> Sufficient</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (
              result.saldo > 500000 &&
              result.saldo < 1000000 &&
              result.cardType === "Master"
            ) {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={master}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "green" }}> Fair</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (
              result.saldo > 500000 &&
              result.saldo < 1000000 &&
              result.cardType === "Visa"
            ) {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={visa}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "green" }}> Fair</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (result.saldo <= 300000 && result.cardType === "Master") {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={master}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "red" }}> Critical</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (result.saldo <= 300000 && result.cardType === "Visa") {
              return (
                <Col md={4}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "#222222",
                      marginBottom: "3",
                    }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                        <img
                          src={visa}
                          alt=""
                          style={{ width: "40px", float: "right" }}
                        />
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>{result.cardNumber}</strong>
                      </CardTitle>
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :
                        <strong style={{ color: "red" }}> Critical</strong>
                      </CardText>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleDelete(result.cardNumber);
                        }}
                        block
                        color="danger"
                        outline
                      >
                        Remove
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else {
              return (
                <Container>
                  <p style={{ opacity: "60%" }}>
                    <i>
                      <strong>No card found. Please add card first.</strong>
                    </i>
                  </p>
                </Container>
              );
            }
          })
        ) : (
          <Container>
            <p style={{ opacity: "60%" }}>
              <i>
                <strong>No card found. Please add card first.</strong>
              </i>
            </p>
            <Col className="subs4">
              <img
                src={expense}
                alt=""
                style={{
                  width: "40%",
                  opacity: "0%",
                  position: "center",
                }}
              />
            </Col>
          </Container>
          // <Loading />
        )}
      </Row>
    </Container>
  );
}

export default CheckStatus;
