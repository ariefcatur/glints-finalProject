import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import { X, Edit3 } from "react-feather";
import "./Profile.css";
import debtPic from "../assets/debt2.png";

const ShowDebt = () => {
  const [debt, setDebt] = useState([]);

  const url = "http://52.148.70.171/debts/notes";
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("get debt", res.data);
        setDebt(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = (id) => {
    axios
      .delete(` http://52.148.70.171/debts/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        return window.location.reload();
      });
  };

  return (
    <Container>
      <Row className="tables">
        <Col xs="12">
          {debt.length !== 0 ? (
            debt.map((debts) => (
              <Table hover style={{ backgroundColor: "whitesmoke" }}>
                <thead
                  className="text-center"
                  style={{ backgroundColor: "#BA8FF2" }}
                >
                  <tr>
                    <th>Due Date</th>
                    <th>Name</th>
                    <th>Debt's Description</th>
                    <th>Type</th>
                    <th>Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{debts.dueDate}</td>
                    <td>{debts.name}</td>
                    <td>{debts.description}</td>
                    <td>{debts.type}</td>
                    <td>{debts.amount}</td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        style={{
                          color: "white",
                          backgroundColor: "#8F48EA",
                          marginRight: "5px",
                        }}
                        onClick={toggle}
                      >
                        <Edit3 size={15} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "are you sure you wish to unsubscribe this itme?"
                            )
                          )
                            handleDelete(debts.id);
                        }}
                        color="danger"
                        outline
                      >
                        <X size={15} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))
          ) : (
            <Container>
              <p style={{ opacity: "60%" }}>
                <i>
                  <strong>No record found.</strong>
                </i>
              </p>
              <Col className="subs5">
                <img
                  src={debtPic}
                  alt=""
                  style={{
                    width: "80%",
                    opacity: "0%",
                    position: "center",
                  }}
                />
              </Col>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ShowDebt;
