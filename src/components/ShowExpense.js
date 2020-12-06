import React, { useState, useEffect } from "react";
import {Container, Col, Card, Row, CardBody, CardText, CardTitle, Button} from 'reactstrap';
import axios from "axios";

const ShowExpenses = () => {
    const [results, setResults] = useState("");

    useEffect(() => {
        axios
            .get("http://3.0.91.163/expense")
            .then((res) => {
                console.log(res)
                setResults(res);
            })
    }, []);

    return (
        <Row>
            {results.length !== 0 ? (
            results.map(result => (
              <Col md={3} key={result.id}>
                <Card style={{marginBottom: "15px", backgroundColor: "#E09F3E"}}>
                  <CardBody className="d-flex flex-column align-items-center" style={{minHeight: "200px"}}>
                    <CardTitle style={{minHeight: "80px", marginTop:"15px"}}><strong>{result.title}</strong></CardTitle>
                    <CardText>{result.purchaseDate}</CardText>
                    <CardText>{result.total}</CardText>
                    <Button 
                    block 
                    color="warning" 
                    className="mt-auto"
                    // onClick={() => {history.push(`/detail/${movie.id}`);}}
                    style={{backgroundColor:"#335C67", color:"whitesmoke"}}
                    ><b>See Details</b></Button>
                  </CardBody>
                </Card>
              </Col>                     
          ))
        ) : (
          <Container></Container>
        )}
        </Row>
    )

}

export default ShowExpenses;