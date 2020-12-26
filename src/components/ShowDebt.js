import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { X } from "react-feather";
import "./Profile.css";
import debtPic from "../assets/debt2.png";
import { Element } from "react-scroll";
import Moment from "react-moment";
import NumberFormat from 'react-number-format';
import Swal from "sweetalert2";

const ShowDebt = () => {

  const url = "https://binar8-jul-hendri.nandaworks.com/debts/notes";
  const token = Cookies.get("token");

  const [debt, setDebt] = useState("");

  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        setDebt(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BA8FF2",
      cancelButtonColor: "#8B8B8B",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            ` https://binar8-jul-hendri.nandaworks.com/debts/delete?id=${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log(res);
            return window.location.reload();
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <Container>
      <Row className="tables">
        <Col xs="12">
          <Row className="mb-0" style={{ paddingLeft: "15px" }}>
            <p style={{ fontSize: "10px", marginRight: "20px" }}>
              <i>
                * <b>Payables</b> : what you owed.
              </i>
            </p>
            <p style={{ fontSize: "10px" }}>
              <i>
                * <b>Receivables</b> : what others owed you.
              </i>
            </p>
          </Row>
          <Table
            hover
            style={{ backgroundColor: "whitesmoke", width: "100%" }}
            className="mt-0"
          >
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
                style={{ backgroundColor: "#BA8FF2", width: "100%" }}
              >
                <tr>
                  <th style={{ width: "30%" }}>Due Date</th>
                  <th>Name</th>
                  <th style={{ width: "30%" }}>Descriptions</th>
                  <th>Type</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              {debt.length !== 0 ? (
                debt.map((debts) => (
                  <tbody style={{ justifyContent: "center" }}>
                    <tr className="text-center">
                      <td style={{ paddingTop: "16px" }}>
                        {" "}
                        <Moment format="D MMM YYYY">{debts.dueDate}</Moment>
                      </td>
                      <td style={{ paddingTop: "16px" }}>{debts.name}</td>
                      <td style={{ paddingTop: "16px" }}>
                        {debts.description}
                      </td>
                      <td style={{ paddingTop: "16px" }}>{debts.type}</td>
                      <td style={{ paddingTop: "16px" }}><NumberFormat value={debts.amount} displayType={'text'} thousandSeparator={true} prefix={'IDR '}/></td>
                      <td>
                        <Row style={{ justifyContent: "center" }}>
                          <Button
                            size="sm"
                            onClick={() => {
                              handleDelete(debts.id);
                            }}
                            color="danger"
                            outline
                          >
                            <X size={15} />
                          </Button>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="7">
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
                              width: "70%",
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
export default ShowDebt;
