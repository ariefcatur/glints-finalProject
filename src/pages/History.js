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
  const [totalHistory, setTotalHistory] = useState({});
  const urlMonth = "http://52.148.70.171/chart/monthly";
  const urlWeek = "http://52.148.70.171/chart/weekly";

  // console.log(token)

  const urlHistory = "http://52.148.70.171/subscription";
  const urlExpense = "http://52.148.70.171/expense";
  const urlTotalHistory = "http://52.148.70.171/history";

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
        // console.log(res.data);
        setHistory(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(urlExpense, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // console.log(res.data)
        setExpense(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    dataMonth();
    dataWeek();

    axios
      .get(urlTotalHistory, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
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
        //  console.log(res);
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
    // console.log(dates, totals)
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
    const url = ` http://52.148.70.171/subscription/${id}/`;
    axios
      .delete(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        return window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // const expenses = () =>{
  //     setIsLoading(true);
  //     axios.get(urlExpense, {headers : {Authorization : `Bearer ${token}`}})
  //     .then((res)=>{
  //         console.log(res.data)
  //         setExpense(res.data);
  //         setIsLoading(false);
  //     })
  //     .catch((err)=> console.log(err));
  // }

  // const subscribeDetails = (id) => {
  //     setIsLoading(true);
  //     const url =`http://3.0.91.163/service?id=${id}`
  //     axios.get(url).then((res)=>{
  //         console.log(res.data.subscribeId)
  //         setSubscribeId(res.data);
  //         setModal(!modal)
  //         setIsLoading(false);
  //     })
  //     .catch((err)=> console.log(err));
  // }
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
                      <Card>
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
                            {history.service.name}
                          </CardTitle>
                          <Row>
                            <Button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "are you sure you wish to unsubscribe this item?"
                                  )
                                )
                                  handleRemove(history.serviceId);
                              }}
                              className="btn btn-primary btn-block"
                              id="button"
                            >
                              Unsubscribe
                            </Button>
                          </Row>
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

          <Col xs="4" style={{ backgroundColor: "white", padding: "7px" }}>
            <h4>History</h4>
            <hr style={{ borderTop: "2px solid #c8c8c8" }} />
            <Card
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "#8F48EA",
                marginBottom: "25px",
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
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
              {history.length !== 0 ? (
                history.map((subscribtion, i) => (
                  <Card
                    key={i}
                    style={{
                      padding: "5px",
                      marginTop: "20px",
                      backgroundColor: "#f6f9fc",
                      marginBottom: "20px",
                    }}
                  >
                    <Row>
                      <Col xs="8">
                        <CardTitle className="text-dark font-weight">
                          <h6 style={{ paddingTop: "15px" }}>
                            {subscribtion.repeat} : {subscribtion.service.name}{" "}
                          </h6>
                          <Moment format="D MMM YYYY">
                            <h6 style={{ paddingTop: "15px" }}>
                              {subscribtion.startDate}
                            </h6>
                          </Moment>
                        </CardTitle>
                      </Col>
                      <Col xs="4">
                        <h6 style={{ float: "right", paddingTop: "15px" }}>
                          IDR {subscribtion.service.cost}{" "}
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
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
              {expense.length !== 0 ? (
                expense.map((expenses, i) => (
                  <Card
                    key={i}
                    style={{
                      marginTop: "20px",
                      padding: "5px",
                      backgroundColor: "#f6f9fc",
                    }}
                  >
                    <Row>
                      <Col xs="6" style={{ paddingTop: "15px" }}>
                        <CardTitle tag="h6" className="text-dark font-weight">
                          <h6>{expenses.title} </h6>
                          <Moment format="D MMM YYYY">
                            <h6 style={{ paddingTop: "15px" }}>
                              {" "}
                              {expenses.purchaseDate}
                            </h6>
                          </Moment>
                        </CardTitle>
                      </Col>
                      <Col xs="6">
                        <h6 style={{ float: "right", paddingTop: "15px" }}>
                          IDR {expenses.total}{" "}
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
