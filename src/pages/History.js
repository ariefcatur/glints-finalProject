import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  CardImg,
  Card,
  Col,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  Collapse,
  ModalBody,
} from "reactstrap";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import { Line } from "@reactchartjs/react-chart.js";
import axios from "axios";
import { checkLogin } from "../Helper";
import Cookies from "js-cookie";
import empty from "../assets/empty.png";
import glass from "../assets/glass.png";
import expense from "../assets/expense.png";
import "../components/Profile.css";
import Moment from "react-moment";
import Swal from "sweetalert2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenWeek, setIsOpenWeek] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const fullName = Cookies.get("fullName");
  const [expense, setExpense] = useState([]);
  const [subscribeId, setSubscribeId] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartWeek, setChartWeek] = useState({});
  const [weekMonth, setWeekMonth] = useState([]);
  const [totalWeek, setTotalWeek] = useState([]);
  const [dates, setDates] = useState([]);
  const [totals, setTotals] = useState([]);
  const [totalHistory, setTotalHistory] = useState([]);
  const urlMonth = "https://binar8-jul-hendri.nandaworks.com/chart/monthly";
  const urlWeek = "https://binar8-jul-hendri.nandaworks.com/chart/weekly";

  const urlHistory = "https://binar8-jul-hendri.nandaworks.com/subscription";
  const urlExpense = "https://binar8-jul-hendri.nandaworks.com/expense";
  const urlTotalHistory = "https://binar8-jul-hendri.nandaworks.com/history";

  const toggle = () => setModal(!modal);
  const collapse = () => {
    setIsOpen(true);
    setIsOpenWeek(false);
  };
  const collapseWeek = () => {
    setIsOpenWeek(true);
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#E5E5E5";

    setIsLoading(true);
    axios
      .get(urlHistory, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setHistory(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(urlExpense, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setExpense(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    dataMonth();
    dataWeek();

    axios
      .get(urlTotalHistory, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("totalhistory" ,res.data);
        setTotalHistory(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const dataMonth = () => {
    let month = [];
    let pay = [];
    axios
      .get(urlMonth, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        for (const dataObj of res.data) {
          month.push(dataObj.dates);
          pay.push(dataObj.totals);
        }
        setChartData({
          labels: month,
          datasets: [
            {
              label: "# Month",
              data: pay,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataWeek = () => {
    let week = [];
    let pay = [];
    axios
      .get(urlWeek, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
          week.push(dataObj.weekMonth);
          pay.push(dataObj.totals);
        }
        setChartWeek({
          labels: week,
          datasets: [
            {
              label: "# Week",
              data: pay,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dates, totals);
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to unsubscribe this service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BA8FF2",
      cancelButtonColor: "#8B8B8B",
      confirmButtonText: "Yes, I'm sure.",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = ` https://binar8-jul-hendri.nandaworks.com/subscription/${id}/`;
        axios
          .delete(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log(res.data);
            return window.location.reload();
          })
          .catch((err) => console.log(err));    
        Swal.fire("Done!", "You've been unsubscribed from this service.", "success");
      }
    });

  };

  return (
    <Container fluid className="content">
      <Container>
        <Row>
          <Col xs="8">
            <Container>
              <Row className="shadow-sm p-3 mb-5 bg-white rounded">
                <Col xs="12" className="bg-default">
                  <Row>
                    <Col xs="6">
                      <h4>Spending Value</h4>
                      <hr style={{ borderTop: "2px solid #c8c8c8" }} />
                    </Col>
                    <Col xs="6">
                      <div style={{ float: "right", position: "relative" }}>
                        <Button
                          id="button"
                          onClick={collapse}
                          style={{ marginBottom: "1rem", marginRight: "20px" }}
                        >
                          Month
                        </Button>
                        <Button
                          id="button"
                          onClick={collapseWeek}
                          style={{ marginBottom: "1rem", marginRight: "10px" }}
                        >
                          Week
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs="12">
                  <Collapse isOpen={isOpen}>
                    <Line data={chartData} options={options} />
                  </Collapse>
                  <Collapse isOpen={isOpenWeek}>
                    <Line data={chartWeek} options={options} />
                  </Collapse>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="ml-0 mt-3 mb-2">
                <h3>Your Subscriptions</h3>
              </Row>
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
            </Container>
            <Container>
              <Row>
                {history.length !== 0 ? (
                  history.map((history) => (
                    <Col xs="4" key={history.id}>
                      <Card className="mb-4">
                        <CardImg
                          top
                          width="100%"
                          height="150px"
                          src={history.service.picture}
                          alt="subscribtion"
                        />
                        <CardBody className="bg-dangers">
                          <CardTitle
                            tag="h6"
                            className="text-dark font-weight-bold text-center"
                          >
                            <p><b>{history.service.name}</b></p>
                          </CardTitle>
                            <Button
                              onClick={() => {
                                handleRemove(history.serviceId);
                              }}
                              className="btn btn-primary btn-block"
                              id="button"
                            >
                              <b>Unsubscribe</b>
                            </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Container>
                    <p style={{ opacity: "60%" }}>
                      <i>
                        <strong>You don't have any subscription.</strong>
                      </i>
                    </p>
                    <Col className="subs">
                      <img
                        src={glass}
                        alt=""
                        style={{
                          width: "50%",
                          opacity: "0%",
                          position: "center",
                        }}
                      />
                    </Col>
                  </Container>
                )}
              </Row>
            </Container>
          </Col>

          <Col xs="4" style={{ backgroundColor: "white", padding: "10px" }}>
            <h4>History</h4>
            <hr style={{ borderTop: "2px solid #c8c8c8" }} />
            <Card
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "#8F48EA",
                marginBottom: "15px",
              }}
            >
              <Row style={{ marginBottom: "20px" }}>
                <Col xs="6" style={{ paddingTop: "30px" }}>
                  <CardTitle className="text-white">
                    <strong>Total :</strong>
                  </CardTitle>
                </Col>
                <Col xs="6" style={{ paddingTop: "30px" }}>
                  <h6 style={{ float: "right" }}>
                    <strong>IDR {totalHistory.total}</strong>{" "}
                  </h6>
                </Col>
              </Row>
            </Card>
            <Element
              ClassName="element"
              id="scroll-container"
              style={{
                position: "relative",
                height: "1000px",
                overflow: "scroll",
              }}
            >
              <h4>Subscriptions</h4>
              <hr style={{ borderTop: "2px solid #c8c8c8", marginRight:"5px" }} />
              {history.length !== 0 ? (
                history.map((subscribtion, i) => (
                  <Card
                    key={i}
                    style={{
                      padding:"3px",
                      marginTop: "20px",
                      backgroundColor: "#f6f9fc",
                      marginBottom: "20px",
                      marginRight:"5px",
                    }}
                  >
                    <Row>
                      <Col xs="8">
                        <CardTitle className="text-dark font-weight">
                          <h6 style={{ paddingTop: "15px" }}>
                            {subscribtion.repeat} : {subscribtion.service.name}{" "}
                          </h6>
                          <Moment format="D MMM YYYY" >{subscribtion.startDate}</Moment>
                        </CardTitle>
                      </Col>
                      <Col xs="4">
                        <h6 style={{ float: "right", paddingTop: "15px" }}>
                          <b>IDR {subscribtion.service.cost}</b>
                        </h6>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <Container style={{ marginBottom: "20px" }}>
                  <p style={{ opacity: "60%" }}>
                    <i>
                      <strong>No subscription found.</strong>
                    </i>
                  </p>
                  <Col className="subs2">
                    <img
                      src={empty}
                      alt=""
                      style={{
                        width: "50%",
                        opacity: "0%",
                        position: "center",
                      }}
                    />
                  </Col>
                </Container>
              )}
              <h4>Expenses</h4>
              <hr style={{ borderTop: "2px solid #c8c8c8", marginRight:"5px" }} />
              {expense.length !== 0 ? (
                expense.map((expenses, i) => (
                  <Card
                    key={i}
                    style={{
                      marginTop: "15px",
                      padding: "5px",
                      backgroundColor: "#f6f9fc",
                      marginRight:"5px",
                    }}
                  >
                    <Row>
                      <Col xs="6" style={{ paddingTop: "15px" }}>
                        <CardTitle tag="h6" className="text-dark font-weight">
                          <h6>{expenses.title} </h6>
                          <Moment format="D MMM YYYY" >{expenses.purchaseDate}</Moment>
                        </CardTitle>
                      </Col>
                      <Col xs="6">
                        <h6 style={{ float: "right", paddingTop: "15px" }}>
                          <b>IDR {expenses.total}</b>
                        </h6>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <Container>
                  <p style={{ opacity: "60%" }}>
                    <i>
                      <strong>No expense found.</strong>
                    </i>
                  </p>
                  <Col className="subs3">
                    <img
                      src={empty}
                      alt=""
                      style={{
                        width: "50%",
                        opacity: "0%",
                        position: "center",
                      }}
                    />
                  </Col>
                </Container>
              )}
            </Element>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default History;
