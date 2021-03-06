import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Card,
  Row,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";

const ShowSubscriptions = () => {
  const [results, setResults] = useState("");

  const apiSubs =
    " https://binar8-jul-hendri.nandaworks.com/subscription";

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(apiSubs, {
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

  return (
    <Row>
      {results.length !== 0 ? (
        results.map((result) => (
          <Col md={3} key={result.id}>
            <Card style={{ marginBottom: "15px", backgroundColor: "#E09F3E" }}>
              <CardBody
                className="d-flex flex-column align-items-center"
                style={{ minHeight: "200px" }}
              >
                <CardTitle style={{ minHeight: "80px", marginTop: "15px" }}>
                  <strong>{result.title}</strong>
                </CardTitle>
                <CardText>{result.purchaseDate}</CardText>
                <CardText>{result.total}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <Container></Container>
      )}
    </Row>
  );
};

export default ShowSubscriptions;
