import React from 'react';
import {
    Container,
    Row,
    CardImg,
    Card,
    Col,
    CardBody,
    CardTitle,
    Button,
    
} from 'reactstrap';
import youtube from './img/youtube.jpg'
import hulu from './img/hulu-logo.jpg'
import disney from './img/disney.jpeg'
import sportify from './img/spotify.jpg'
import netflix from './img/netflix.jpeg'
import logo from './img/Rectangle.png'
import { Link } from 'react-router-dom';

const Home = () =>{
    return(
        <Container fluid>
                <Row className="banner"> 
                    <Col xs="4">
                        <div className="logo">
                        <h1>Stress Free</h1>
                        <h1>Subscription Manager</h1>
                        <Button 
                            to=""
                            className="btn btn-warning"
                        >
                            Join Now
                        </Button>
                        </div>
                    </Col>
                    <Col xs="8"> 
                        <Row>
                        <div className="logo-gambar"></div>   
                        </Row>  
                    </Col>
                </Row>
            <section id="features" className="features">
                <Container>
                    <ul className="nav nav-tabs row d-flex"> 
                        <li className="nav item col-3 aos-init aos-anime" data-aos="zoom-in">
                            <a className="nav-link show active" data-toggle="tab" href ="#tab-1">
                                <i className="ri-gps-line">
                                </i>
                                <h4 className="d-none d-lg-block">Tutorial</h4>
                            </a>    
                        </li>
                    </ul>
                </Container>
            </section>
            <Container>
                <Row className="ml-0 mt-3 mb-2">
                    <h3 className="section-title">Popular Apps</h3>
                    <div className="section-title-divider"></div>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs="3">
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
                    <Col xs="3">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={youtube}
                            alt="subscribtion"
                        />
                        </Card>
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Youtube Premium</h4>
                        </CardTitle>
                    </Col>
                    <Col xs="3">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="170px"
                            src={netflix}
                            alt="subscribtion"
                        />
                        </Card>
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Netflix</h4>
                        </CardTitle>
                    </Col>
                    <Col xs="3">
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
    )
}

export default Home;