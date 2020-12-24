import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  CardImg,
  Card,
  Col,
  CardBody,
  CardTitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import subscribe from "./img/subscribe.svg";
import Signup from "./Signup";
import expense from "./img/expense.svg";
import budgetting from "./img/budgetting.svg";
import history from "./img/history.svg";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faCoins,
  faDigitalTachograph,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AOS from 'aos';

const Home = (props) => {

  const urlSubscribe = " https://binar8-jul-hendri.nandaworks.com/service";
  const [subscribes, setSubscribes] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(urlSubscribe).then((res) => {
      setSubscribes(res.data);
      setLoading(false);
    });
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
    
  const btnTitle2= [
    "Try For Free",
  ]
  const bgcolor=[
    "#8F48EA",
  ]
  const color=[
    "white",
  ]

  const addIcon = <FontAwesomeIcon icon={faAd} />;
  const addCoins = <FontAwesomeIcon icon={faCoins} />;
  const addDigital = <FontAwesomeIcon icon={faDigitalTachograph} />;
  const addClipboard = <FontAwesomeIcon icon={faClipboard} />;

  if (loading) {
    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Spinner type="grow" color="warning" />
        </Row>
        <Row className="justify-content-center mt-3 font-weight-bold">
          Loading...
        </Row>
      </div>
    );
  }
  return (
    <>
      <Container fluid>
        <Row className="banner">
          <Col xs="5">
            <div className="logo">
              <h1>
                <b>Stress Free</b>
                {/* <a href="#about">Stress Free</a> */}
              </h1>
              <h1>
                <b>Subscription Manager</b>
              </h1>
              <Signup 
              btnTitle={btnTitle2}
              backgroundColor={bgcolor}
              color={color}
              />
            </div>
          </Col>
          <Col xs="7">
            <div className="logo-gambar"></div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="about" id="about" data-aos="fade-up">
        <h1 className="section-title" id="#about" style={{ color: "#003764" }}>
          <b>About US</b>
        </h1>
        <div className="section-title-divider"></div>

        <div className="aboutIntro">
          <h3>
            <span className="text-green">Manage</span> your subscriptions
            and expenses data with ease.
            <br />
            <br/>
            You can easily keep a pulse on your subscription and expense in one
            platform from anywhere.
          </h3>
        </div>
      </Container>
      <Container fluid className="content">
        <section id="features" className="features">
          <Container>
            <Nav>
              <Col sm="3">
                <Card className="tabs">
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      <Row>
                        <Col sm="8">
                          <h4>Subscribe</h4>
                        </Col>
                        <Col sm="4" className="icon">
                          {" "}
                          {addIcon}{" "}
                        </Col>
                      </Row>
                    </NavLink>
                  </NavItem>
                </Card>
              </Col>
              <Col sm="3">
                <Card className="tabs">
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      <Row>
                        <Col sm="8">
                          <h4>Expense</h4>
                        </Col>
                        <Col sm="4" className="icon">
                          {" "}
                          {addCoins}{" "}
                        </Col>
                      </Row>
                    </NavLink>
                  </NavItem>
                </Card>
              </Col>
              <Col sm="3">
                <Card className="tabs">
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      <Row>
                        <Col sm="8">
                          <h4>Debts</h4>
                        </Col>
                        <Col sm="4" className="icon">
                          {" "}
                          {addDigital}{" "}
                        </Col>
                      </Row>
                    </NavLink>
                  </NavItem>
                </Card>
              </Col>
              <Col sm="3">
                <Card className="tabs">
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        toggle("4");
                      }}
                    >
                      <Row>
                        <Col sm="8">
                          <h4>History</h4>
                        </Col>
                        <Col sm="4" className="icon">
                          {" "}
                          {addClipboard}{" "}
                        </Col>
                      </Row>
                    </NavLink>
                  </NavItem>
                </Card>
              </Col>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="intro">
                          <h3>
                            <strong>
                              Easily create a subscription website
                            </strong>
                          </h3>
                          <h4 style={{ textAlign: "justify" }}>
                            Simply put in the items you wish to purchase on
                            subscription, and the website builder will generate
                            a subscription website for you right away. Join a
                            member and create your own management subscription
                            service you want to make.
                          </h4>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <img src={subscribe} width="100%" height="400px"></img>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="intro">
                          <h3>
                            <strong>Control your own expense</strong>
                          </h3>

                          <h4 style={{ textAlign: "justify" }}>
                            Our expense feature will help you monitoring,
                            tracking and most importantly managing your
                            expenses. Just remember to input your expense data
                            whenever you make them.
                          </h4>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <img src={expense} width="100%" height="400px"></img>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="intro">
                          <h3>
                            <strong>
                              Trackdown your debts activities easily
                            </strong>
                          </h3>
                          <h4 style={{ textAlign: "justify" }}>
                            Don't want to lose track on your debts records? Just
                            keep them in our easy-to-use debt's note feature.
                            You can instantly edit or delete your record once
                            you are finish with it.
                          </h4>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <img src={budgetting} width="100%" height="400px"></img>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="intro">
                          <h3>
                            <strong>
                              Real-time reporting on your expenses and
                              subscriptions
                            </strong>
                          </h3>
                          <h4 style={{ textAlign: "justify" }}>
                            With full visibility of all business expenditure and
                            powerful reporting features at your disposal, SubsIt
                            empowers you to make smarter financial decisions.
                          </h4>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <img src={history} width="100%" height="400px"></img>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </section>
      </Container>
      <Container fluid className="popular">
        <Container id="service" data-aos="fade-up">
          <h1 className="section-title" style={{ color: "#003764" }}>
            <b>Popular Apps</b>
          </h1>
          <div className="section-title-divider "></div>
          <Row className="mt-3">
            {subscribes.slice(0, 4).map((subscribes, i) => (
              <Col sm="3" key={i}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    height="170px"
                    src={subscribes.picture}
                    alt="subscribtion"
                  />
                  <CardTitle
                    tag="h6"
                    className="text-dark font-weight-bold text-center"
                  >
                    <h4>{subscribes.name}</h4>
                  </CardTitle>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      {/* <Container fluid className="team">
                <Container>
                    <h1 className="section" >Team</h1>
                    <div className="section-title-divider "></div>
                </Container>
            </Container> */}
    </>
  );
};

export default Home;
