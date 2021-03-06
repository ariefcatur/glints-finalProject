import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  ModalBody,
  Collapse,
  Spinner,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";
import youtube from "./img/youtube.jpg";
import hulu from "./img/hulu-logo.jpg";
import disney from "./img/disney.jpeg";
import sportify from "./img/spotify.jpg";
import netflix from "./img/netflix.jpeg";
import logo from "./img/Rectangle.png";
import { Link, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { checkLogin } from "../Helper";
import Cookies from "js-cookie";
import '../components/Profile.css'
import sleep from '../assets/sleep.png'
import NumberFormat from 'react-number-format';

// const dataMonth= {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
//     datasets:[
//         {
//             label: '# Month',
//             data: [12, 19, 3, 5, 2, 3],
//             fill: false,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgba(255, 99, 132, 0.2)',
//         },
//     ],
// }

// const options = {
//     scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
// }

// const dataWeek= {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//     datasets:[
//         {
//             label: '# Week',
//             data: [12, 19, 3, 5],
//             fill: false,
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgba(255, 99, 132, 0.2)',
//         },
//     ],
// }

const Dashboard = () => {
  const urlSubscribe = " https://binar8-jul-hendri.nandaworks.com/service";
  const [subscribes, setSubscribes] = useState([]);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenWeek, setIsOpenWeek] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribeId, setSubscribeId] = useState([]);
  const token = Cookies.get("token");
  const [startDate, setStartDate] = useState(0);
  const [serviceId, setServiceId] = useState([]);
  const [card, setCard] = useState([]);
  const [cardId, setCardId] = useState(null);
  const [checkCard, setCheckCard] = useState("");
  const urlCard = " https://binar8-jul-hendri.nandaworks.com/card";
  const [chartData, setChartData] = useState({});
  const [dates, setDates] = useState([]);
  const [totals, setTotals] = useState([]);
  const urlMonth = "https://binar8-jul-hendri.nandaworks.com/chart/monthly";
  const [chartWeek, setChartWeek] = useState({});
  const [weekMonth, setWeekMonth] = useState([]);
  const [totalWeek, setTotalWeek] = useState([]);
  const urlWeek = " https://binar8-jul-hendri.nandaworks.com/chart/weekly";

  const history = useHistory();

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

    setLoading(true);
    axios
      .get(urlSubscribe)
      .then((res) => {
        console.log(res.data);
        setSubscribes(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(urlCard, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCheckCard(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    dataMonth();
    dataWeek();
  }, []);

  const subscribeDetails = (id) => {
    setLoading(true);
    const url = ` http://52.148.70.171/service?id=${id}`;
    axios
      .get(url)
      .then((res) => {
        console.log("subscribe id", res.data);
        setSubscribeId(res.data);
        setModal(!modal);
        setLoading(false);
        subscribeCard();
        setServiceId(id);
      })
      .catch((err) => console.log(err));
  };

  const subscribeCard = () => {
    setLoading(true);
    axios
      .get(urlCard, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        setCard(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const subscribtion = (e) => {
    e.preventDefault();
    const url = ` http://52.148.70.171/subscription/${serviceId}/?cardId=${cardId}`;
    // console.log("service Id ", serviceId, "cardId ", cardId)
    // console.log(token)
    axios
      .post(url, null, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        history.push("/history");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Spinner
            type="grow"
            style={{ width: "4rem", height: "4rem", color: "#8F48EA" }}
          />
        </Row>
        <Row className="justify-content-center mt-3 font-weight-bold">
          Please wait...
        </Row>
      </div>
    );
  }

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
              backgroundColor: "rgb(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              pointBackgroundColor: "rgb(255, 99, 132)",
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

  return (
    <Container fluid className="content">
      <Container>
        <Row className="shadow-sm p-3 mb-5 bg-white rounded">
          <Col xs="12" className="bg-default">
            <Row>
              <Col xs="6">
                <h4>Spending Value</h4>
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
                    style={{ marginBottom: "1rem", marginRight: "30px" }}
                  >
                    Week
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="12" className="bg-default">
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
        <Row className="ml-0 mt-3 mb-0">
          <h3>Popular Apps</h3>
        </Row>
        <hr style={{ borderTop: "2px solid #c8c8c8" }} />
      </Container>
      <Container>
        <Row>
          {checkCard.length !== 0 ? (
            subscribes.map((subscribes) => (
              <Col xs="3" key={subscribes.id}>
                <Card style={{ marginBottom: "50px" }}>
                  <CardImg
                    top
                    width="100%"
                    height="170px"
                    src={subscribes.picture}
                    alt="subscribtion"
                    style={{ border: "0.5px solid grey" }}
                  />
                  <CardBody className="bg-dangers">
                    <CardTitle
                      tag="h6"
                      className="text-dark font-weight-bold text-center"
                    >
                      <p>
                        <b>{subscribes.name}</b>
                      </p>
                    </CardTitle>
                    <Button
                      onClick={() => subscribeDetails(subscribes.id)}
                      className="btn btn-primary btn-block"
                      id="button"
                    >
                      <b>Susbcribe</b>
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Container className="text-align-center">
              <Container
                style={{
                  opacity: "60%",
                  paddingTop: "30px",
                }}
              >
                <p>
                  <b>
                    <i>
                      Oops! It seems like you haven't added any card yet. Please
                      submit your card information in your profile page before
                      using this feature.
                    </i>
                  </b>
                </p>
                <Col className="subs6">
                  <img
                    src={sleep}
                    alt=""
                    style={{
                      width: "50%",
                      opacity: "0%",
                      position: "center",
                    }}
                  />
                </Col>
              </Container>
            </Container>
          )}
        </Row>
        <Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
              {subscribeId.map((subscribe) => (
                <Row key={subscribe.id}>
                  {/* <CardTitle style={{textAlign:"center"}}>
                    <p>
                      <strong>{subscribe.name}</strong>
                    </p>
                  </CardTitle> */}
                  <CardImg
                    top
                    width="15%"
                    src={subscribe.picture}
                    style={{ border: "0.5px solid grey" }}
                    alt="subscribtion"
                  />
                  <CardBody style={{ marginBottom:"-25px" }}>
                    <CardText style={{ textAlign: "justify" }}>
                      <p>{subscribe.description}</p>
                    </CardText>
                    {/* <CardText>
                      <p>
                        Cost: <strong>IDR {subscribe.cost}</strong>
                      </p>
                    </CardText> */}
                    <Row style={{marginBottom: "-5px"}}>
                      <Col md="7">
                        
                          <FormGroup>
                            <Input
                              type="select"
                              name="cardId"
                              id="cardId"
                              onChange={(e) => {
                                setCardId(e.target.value);
                                console.log(e.target.value);
                              }}
                            >
                              <option>Select Card</option>
                              {card.length !== 0
                                ? card.map((cards) => (
                                    <option value={cards.id}>
                                      {cards.cardBank} - IDR {cards.saldo}
                                    </option>
                                  ))
                                : ""}
                            </Input>
                          </FormGroup>
                        
                      </Col>
                      <Col md="5">
                      <Alert id="cost">
                      <strong><NumberFormat value={subscribe.cost} displayType={'text'} thousandSeparator={true} prefix={'IDR '}/> </strong>
                      </Alert>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="12">
                        <Button
                          onClick={subscribtion}
                          className="btn btn-block"
                          id="button"
                        >
                          <b>Subscribe</b>
                        </Button>
                    </Col>
                    </Row>
                  </CardBody>
                </Row>
              ))}
            </ModalBody>
          </Modal>
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
