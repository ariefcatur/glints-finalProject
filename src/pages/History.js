import React, { useEffect, useState } from 'react';
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
    Collapse
    
} from 'reactstrap';
import youtube from './img/youtube.jpg'
import hulu from './img/hulu-logo.jpg'
import disney from './img/disney.jpeg'
import sportify from './img/spotify.jpg'
import netflix from './img/netflix.jpeg'
import logo from './img/Rectangle.png'
import { Link } from 'react-router-dom';
import { Line } from '@reactchartjs/react-chart.js'
import axios from 'axios';

const dataMonth= {
    labels: ['January', 'February', 'March', 'April', 'May', 'Juny'],
    datasets:[
        {
            label: '# Month',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
}


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
}

const dataWeek= {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets:[
        {
            label: '# Week',
            data: [12, 19, 3, 5],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
}




const History = () =>{ 

    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenWeek, setIsOpenWeek] = useState(false);


    const toggle = () =>setModal(!modal);
    const collapse = () => {setIsOpen(true); setIsOpenWeek(false)}
    const collapseWeek = () => {setIsOpenWeek(true); setIsOpen(false);}

    return(
        <Container fluid>
            <Container>
            <Row>
            <Col xs="8">
            <Container>
                <Row>
                    <Col xs="12">
                    <Row>
                        <Col xs="6">
                            <h4>Spending Value</h4>
                        </Col>
                        <Col xs="6">   
                        <div style={{float :'right', position:'relative',  }}> 
                        <Button color="primary" onClick={collapse} style={{ marginBottom: '1rem',marginRight:'20px' }}>Month</Button>
                        <Button color="primary" onClick={collapseWeek} style={{ marginBottom: '1rem', marginRight:'10px'}}>Week</Button>
                        </div>
                        </Col>
                    </Row>
                    </Col>
                    <Col xs="12">
                        <Collapse isOpen={isOpen}>
                            <Line data={dataMonth}  options={options} />
                        </Collapse>
                        <Collapse isOpen={isOpenWeek}>
                            <Line data={dataWeek}  options={options} />
                        </Collapse>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Row className="ml-0 mt-3 mb-2">
                <h3>Your Subscribe</h3>
            </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs="4">
                    <Card>
                        <CardImg
                            top
                            width="100%"
                            height="150px"
                            src={disney}
                            alt="subscribtion"
                        />
                        <CardBody className="bg-dangers">
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Disney</h4>
                        </CardTitle>
                        <Row>
                        <Button
                            onClick={toggle}
                            className="btn btn-primary btn-block"
                            id ="button"
                        >
                            Unsubcribe
                        </Button>
                        </Row>
                        </CardBody>
                    </Card>
                    </Col>   
                    <Col xs="4">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="150px"
                            src={netflix}
                            alt="subscribtion"
                        />
                        <CardBody className="bg-dangers">
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Netflix</h4>
                        </CardTitle>
                        <Row>
                        <Link
                            to=""
                            className="btn btn-primary btn-block"
                            id="button"
                        >
                            Unsubscribe
                        </Link>
                        </Row>
                        </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4">
                        <Card>
                        <CardImg
                            top
                            width="100%"
                            height="150px"
                            src={sportify}
                            alt="subscribtion"
                        />
                        <CardBody className="bg-dangers">
                        <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                            <h4>Spotify</h4>
                        </CardTitle>
                        <Row>
                        <Link
                            to=""
                            className="btn btn-primary btn-block"
                            id="button"
                        >
                            Unsubscribe
                        </Link>
                        </Row>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}> Disney </ModalHeader>
                    <CardImg toggle={toggle}
                            top
                            width="100%"
                            height="300px"
                            src={disney}
                            alt="subscribtion"
                        />
                    <CardBody className="bg-dangers">
                        <CardText >
                            <h5>
                                Next Payment:
                            </h5>
                            <h5>
                                Duration:
                            </h5>
                            <h5>
                                Cost:
                            </h5>
                        </CardText>
                        <Row>
                        <Link
                            to=""
                            className="btn btn-warning btn-block"
                        >
                            Subscribe
                        </Link>
                        </Row>
                    </CardBody>
                </Modal>
            </Container>
            </Col>
            <Col xs="4" style={{backgroundColor: '#f6f9fc'}}>
                
                <h4>history</h4>
                
                <Card style={{marginTop: '20px'}}>
                    <CardTitle tag="h6" className="text-dark font-weight-bold">Disney</CardTitle>
                      <h4>  $400.0 </h4>
                </Card>
                <Card style={{marginTop: '20px'}}>
                    <CardTitle tag="h6" className="text-dark font-weight-bold">Disney</CardTitle>
                        <h4>$400.0</h4>
                </Card>
                <Card style={{marginTop: '20px'}}>
                    <CardTitle tag="h6" className="text-dark font-weight-bold">Disney</CardTitle>
                    <h4>$400.0</h4>
                </Card>   
            </Col>
            </Row>
            </Container>
        </Container>
    )
}

export default History;