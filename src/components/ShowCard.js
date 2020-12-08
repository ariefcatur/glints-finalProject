import React, { useState, useEffect } from "react";
import {Container, Col, Card, Row, CardBody, CardText, CardTitle, Button} from 'reactstrap';
import axios from "axios";
import Cookies from 'js-cookie';

const ShowExpenses = () => {

    const [results, setResults] = useState("");

    const urlCard = "http://3.0.91.163/card";

    const token = Cookies.get('token');

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

    return (
            <>
            {results.length !== 0 ? (
            results.map(result => (
              <Col md={3} key={result.id}>
                <Card style={{marginBottom: "15px"}}>
                  <CardBody className="d-flex flex-column align-items-center">
                    <CardTitle style={{marginTop:"15px"}}><strong>{result.cardBank}</strong></CardTitle>
                    <CardText>{result.cardNumber}</CardText>
                    <CardText>Rp {result.saldo}</CardText>
                    <CardText>{result.cardHolder}</CardText>
                  </CardBody>
                </Card>
              </Col>                     
          ))
        ) : (
          <Container></Container>
        )}
        </>
    )

}

export default ShowExpenses;