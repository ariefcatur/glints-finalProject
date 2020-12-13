import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from './Loading'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

function CheckStatus() {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const urlCard = "http://3.0.91.163/card";

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
        setLoading(true);
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
            if (result.saldo >= 1000000) {
              return (
                <Col md={4}>
                  <Card
                    className="mb-3"
                    style={{ backgroundColor: "#bcf7f4", color: "#222222" }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :<strong> Sufficient</strong>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (result.saldo > 500000 && result.saldo < 1000000) {
              return (
                <Col md={4}>
                  <Card
                    className="mb-3"
                    style={{ backgroundColor: "#c8f292", color: "#222222" }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :<strong> Fair</strong>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              );
            } else if (result.saldo <= 300000) {
              return (
                <Col md={4}>
                  <Card
                    className="mb-3"
                    style={{ backgroundColor: "#f07c83", color: "#222222" }}
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>{result.cardBank}</strong>
                      </CardTitle>
                      <hr style={{ borderTop: "2px solid #222222" }} />
                      <CardTitle>
                        <strong>IDR {result.saldo}</strong>
                      </CardTitle>
                      <CardText>
                        Status :<strong> Critical</strong>
                      </CardText>
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
          <Loading />
        )}
      </Row>
    </Container>
  );
}

export default CheckStatus;
