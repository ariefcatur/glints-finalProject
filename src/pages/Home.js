import React, {useState} from 'react';
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

    
} from 'reactstrap';
import youtube from './img/youtube.jpg'
import hulu from './img/hulu-logo.jpg'
import disney from './img/disney.jpeg'
import sportify from './img/spotify.jpg'
import netflix from './img/netflix.jpeg'
import logo from './img/Rectangle.png'
import subscribe from './img/subscribe.svg'
import expense from './img/expense.svg'
import budgetting from './img/budgetting.svg'
import history from './img/history.svg'
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAd, faCoins, faDigitalTachograph, faClipboard} from '@fortawesome/free-solid-svg-icons';

const Home = () =>{
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
      }
    
    const addIcon = <FontAwesomeIcon icon ={faAd}/>;
    const addCoins = <FontAwesomeIcon icon ={faCoins}/>;
    const addDigital = <FontAwesomeIcon icon ={faDigitalTachograph}/>;
    const addClipboard = <FontAwesomeIcon icon={faClipboard}/>;
    return(
        <>
            <Container fluid>
                <Row className="banner"> 
                    <Col xs="5">
                        <div className="logo">
                        <h1><b>Stress Free</b></h1>
                        <h1><b>Subscription Manager</b></h1>
                        <Button 
                            to=""
                            className="btn btn-primary" 
                            id="button"
                        >
                            Join Now
                        </Button>
                        </div>
                    </Col>
                    <Col xs="7"> 
                        <Row>
                        <div className="logo-gambar"></div>   
                        </Row>  
                    </Col>
                </Row>
            </Container>
            <Container fluid className="content">
            <section id="features" className="features">
                <Container >
                    <Nav >
                        <Col sm="3" >
                            <Card className="tabs">
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '1'})}
                                        onClick={() =>{toggle('1');}}
                                    >
                                        <Row><Col sm="8"><h4>Subscribe</h4></Col>
                                         <Col sm="4" className="icon"> {addIcon} </Col></Row>
                                    </NavLink>
                                </NavItem>
                            </Card>
                        </Col>
                        <Col sm="3">
                            <Card className="tabs">
                                <NavItem >
                                    <NavLink className={classnames({active: activeTab === '2'})}
                                    onClick={()=>{toggle('2');}}
                                >
                                   <Row><Col sm="8" ><h4>Expanse</h4></Col> 
                                   <Col sm="4" className="icon"> {addCoins} </Col></Row> 
                                    </NavLink>
                                </NavItem>
                            </Card>
                        </Col>
                        <Col sm="3">
                            <Card className="tabs">
                                <NavItem>
                                    <NavLink className={classnames({active: activeTab === '3'})}
                                    onClick={()=>{toggle('3');}}
                                >
                                    <Row><Col sm="8"><h4>Budgetting</h4></Col> 
                                    <Col sm="4" className="icon"> {addDigital} </Col></Row>
                                    </NavLink>
                                </NavItem>
                            </Card>
                        </Col>
                        <Col sm ="3">
                            <Card className="tabs">
                                <NavItem>
                                    <NavLink className={classnames({active: activeTab === '4'})}
                                    onClick={()=>{toggle('4');}}
                                >
                                     <Row><Col sm="8"><h4>History</h4></Col>
                                      <Col sm="4"className="icon" > {addClipboard} </Col></Row>
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
                                         <h4>subcribe</h4>
                                    </Col>
                                    <Col lg="6" style={{marginTop:'20px', marginBottom:'20px'}}>
                                        <img 
                                            src={subscribe}
                                            width="100%"
                                            height="400px"
                                        ></img>
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
                                         <h4>Expense</h4>
                                    </Col>
                                    <Col lg="6" style={{marginTop:'20px', marginBottom:'20px'}}>
                                        <img 
                                            src={expense}
                                            width="100%"
                                            height="400px"
                                        ></img>
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
                                         <h4>Budgetting</h4>
                                    </Col>
                                    <Col lg="6" style={{marginTop:'20px', marginBottom:'20px'}}>
                                        <img 
                                            src={budgetting}
                                            width="100%"
                                            height="400px"
                                        ></img>
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
                                         <h4>history</h4>
                                    </Col>
                                    <Col lg="6" style={{marginTop:'20px', marginBottom:'20px'}}>
                                        <img 
                                            src={history}
                                            width="100%"
                                            height="400px"
                                        ></img>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Container>
            </section>
            </Container>
            <Container fluid className="content">
                <Container>
                    <h3 className="section" >Popular Apps</h3>
                    <div className="section-title-divider "></div>
                <Row>
                    <Col sm="3">
                    <Card>
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={disney}
                            alt="subscribtion"
                        />
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Disney</h4>
                        </CardTitle>
                    </Card>
                    </Col>   
                    <Col sm="3">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={youtube}
                            alt="subscribtion"
                        />
                        
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Youtube Premium</h4>
                        </CardTitle>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={netflix}
                            alt="subscribtion"
                        />
                       
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Netflix</h4>
                        </CardTitle>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card>  
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={sportify}
                            alt="subscribtion"
                        />
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Spotify</h4>
                        </CardTitle>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </Container>
        </>
    )
}

export default Home;