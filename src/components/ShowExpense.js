import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row, Table } from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { X } from "react-feather";
import expense from "../assets/expense.png";
import "./Profile.css";
import {Element} from "react-scroll"
import Moment from 'react-moment';


const ShowExpenses = () => {
  const [results, setResults] = useState("");

  const urlExpense = " https://binar8-jul-hendri.nandaworks.com/expense";

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
      .delete(`https://binar8-jul-hendri.nandaworks.com/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return window.location.reload();
      });
  };

  return (
    <Container>
      <Row className="tables">
        <Col xs="12">
          <Table hover style={{ backgroundColor: "whitesmoke" }}>
          <Element
              ClassName="element"
              id="scroll-container"
              style={{
                position: "relative",
                height: "500px",
                overflow: "scroll",
                
              }}
            >
            <thead
              className="text-center"
              style={{ backgroundColor: "#BA8FF2" }}
            >
              <tr>
                <th style={{ width: "30%" }}>Date</th>
                <th>Transaction</th>
                <th>Currency</th>
                <th>Costs</th>
                <th>Action</th>
              </tr>
            </thead>
            
            {results.length !== 0 ? (
              results.map((result) => (
                <tbody>
                  <tr>
                    <td className="text-center"><Moment format="D MMM YYYY" >{result.purchaseDate}</Moment></td>
                    <td className="text-center" style={{ width: "50%" }}>{result.title}</td>
                    <td className="text-center">IDR</td>
                    <td className="text-center">{result.total}</td>
                    <td style={{ width: "100%" }} className="text-center">
                      <Button
                        size="sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Expense record of "${result.title}" is going to be deleted. Please click OK to confirm.`
                            )
                          )
                            handleDelete(result.id);
                        }}
                        color="danger"
                        outline
                      >
                        <X size={15} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
                
              ))
            
              )  : (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <Container>
                      <p style={{ opacity: "60%" }}>
                        <i>
                          <strong>No expense found.</strong>
                        </i>
                      </p>
                      <Col className="subs3">
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
                  </td>
                </tr>
              </tbody>
            )}
            </Element>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowExpenses;
