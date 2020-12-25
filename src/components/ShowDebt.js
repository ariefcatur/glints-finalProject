import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios";
import Cookies from "js-cookie";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import { X } from "react-feather";
import "./Profile.css";
import debtPic from "../assets/debt2.png";
import { Element } from "react-scroll";
import Moment from "react-moment";
import swal from "sweetalert";

const ShowDebt = () => {
  const [debt, setDebt] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState("");

  const url = "https://binar8-jul-hendri.nandaworks.com/debts/notes";
  const token = Cookies.get("token");

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
    axios
      .delete(` https://binar8-jul-hendri.nandaworks.com/debts/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        swal({
          icon: "success",
          title: "Done!",
          text: "Your selected record has been deleted.",
          type: "success",
          buttons: "OK",
          timer: 3000,
        });  
        return window.location.reload();
      });
  };

  const handleSubmit = (id) => {
    const data = {
      name: name,
      description: description,
      amount: amount,
      type: type,
      dueDate: dueDate,
    };

    axios
      .patch(`https://binar8-jul-hendri.nandaworks.com/debts/update?id=${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Container>
      <Row className="tables">
        <Col xs="12">
          <Row className="mb-0" style={{paddingLeft:"15px"}}>
          <p style={{ fontSize: "10px", marginRight:"20px" }}>
            <i>* <b>Payables</b> : what you owed.</i>
          </p>
          <p style={{ fontSize: "10px" }}>
            <i>* <b>Receivables</b> : what others owed you.</i>
          </p>
          </Row>
          <Table hover style={{ backgroundColor: "whitesmoke", width: "100%" }} className="mt-0">
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
                  <th>Due Date</th>
                  <th>Name</th>
                  <th style={{ width: "25%" }}>Descriptions</th>
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
                      <td style={{ paddingTop: "16px" }}>{debts.amount}</td>
                      <td>
                        <Row style={{ justifyContent: "center" }}>
                          <Button
                            size="sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Debt record of "${debts.name} - ${debts.description}" is about to be deleted. Please click OK to confirm.`
                                )
                              )
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
                    {/* <tr>
                      <td colSpan="7">
                        <p style={{ fontSize: "10px" }}>
                          <i>* Payables : what you owed.</i>
                        </p>
                        <p style={{ fontSize: "10px" }}>
                          <i>* Receivables : what others owed you.</i>
                        </p>
                      </td>
                    </tr> */}
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
