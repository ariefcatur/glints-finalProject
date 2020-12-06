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
    ModalBody,
    Collapse,
    Spinner,
} from 'reactstrap';
import youtube from './img/youtube.jpg'
import hulu from './img/hulu-logo.jpg'
import disney from './img/disney.jpeg'
import sportify from './img/spotify.jpg'
import netflix from './img/netflix.jpeg'
import logo from './img/Rectangle.png'
import { Link, useParams} from 'react-router-dom';
import { Line } from '@reactchartjs/react-chart.js'
import axios from 'axios';


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




const Dashboard = () =>{ 
    const urlSubscribe = 'http://3.0.91.163/service'
    const [subscribes, setSubscribes] = useState([]);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenWeek, setIsOpenWeek] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscribeId, setSubscribeId] = useState([]);
    const [chartDataMonth, setChartDataMonth] = useState({});
    

    const toggle = () =>setModal(!modal);
    const collapse = () => {setIsOpen(true); setIsOpenWeek(false)}
    const collapseWeek = () => {setIsOpenWeek(true); setIsOpen(false);}

    useEffect(() => {
        setLoading(true);
        axios.get(urlSubscribe).then((res) => {
          setSubscribes(res.data);
          setLoading(false);
        })
        .catch((err)=> console.log(err));

        // axios.get(`${urlSubscribe}?id=${id}`).then((res)=>{
        //     console.log(res.data.subscribeId)
        //     setSubscribeId(res.data);
        //     setLoading(false);
        // })
        // .catch((err)=> console.log(err));
      }, []);
    
    const subscribeDetails = (id) => {
        setLoading(true);
        const url =`http://3.0.91.163/service?id=${id}`
        axios.get(url).then((res)=>{
            console.log(res.data.subscribeId)
            setSubscribeId(res.data);
            setModal(!modal)
            setLoading(false);
        }
        )
            
    }

    if (loading) {
        return (
          <div>
            <Row className="justify-content-center mt-5">
              <Spinner type="grow" color="warning" />
            </Row>
            <Row className="justify-content-center mt-3 font-weight-bold">
              Sedang memuat data...
            </Row>
          </div>
        );
      }

      const dataMonth = {
    //     // axios.get("http://3.0.91.163/chart/monthly")
    //     // .then((res)=>{
    //     //     console.log(res)
    //     // }).catch((err)=>{
    //     //     console.log(err)
    //     // });
        
    //     setChartDataMonth({
            labels: ['January',  'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'October', 'November'],
            datasets:[
                {
                    label: '# Month',
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],  
        // })
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
    return(
        <Container fluid className="content">
            <Container>
                <Row className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Col xs="12" className="bg-default">
                        <Row>
                        <Col xs="6">
                            <h4>Spending Value</h4>
                        </Col>
                        <Col xs="6">   
                        <div style={{float :'right', position:'relative',  }}> 
                        <Button  id="button" onClick={collapse} style={{ marginBottom: '1rem',marginRight:'20px' }}>Month</Button>
                        <Button  id="button" onClick={collapseWeek} style={{ marginBottom: '1rem', marginRight:'30px'}}>Week</Button>
                        </div>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs="12" className="bg-default">
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
                <h3>Popular Apps</h3>
            </Row>
            </Container>
            <Container>
                <Row>
                    {subscribes.map((subscribes, ) =>(
                        <Col xs="3" key={subscribes.id}>
                        <Card style={{marginBottom:'50px'}}>
                            <CardImg
                                top
                                width="100%"
                                height="170px"
                                src={subscribes.picture}
                                alt="subscribtion"
                            />
                            <CardBody className="bg-dangers">
                            <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                                <h5>{subscribes.name}</h5>
                            </CardTitle>
                            <Row>
                            <Button
                                onClick={()=> subscribeDetails(subscribes.id)}
                                className="btn btn-primary btn-block"
                                id="button"
                            >
                                Subcribe
                            </Button>
                            </Row>
                            </CardBody>
                        </Card>
                        </Col>  
                    ))}
                </Row>
                <Row>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}> 
                        </ModalHeader>
                        <ModalBody>
                        {subscribeId.map((subscribe)=>(
                            <Col key={subscribe.id}>
                            <CardImg
                                top
                                height="300px"
                                src={subscribe.picture}
                                alt="subscribtion"
                            /> 
                        <CardBody>
                            <CardText>
                                <h5>
                                    Description: <br/>{subscribe.description}
                                </h5>
                                <h5>
                                    Cost: {subscribe.cost}
                                </h5>
                            </CardText>
                            <Row>
                            <Button
                                to=""
                                className="btn btn-primary btn-block"
                                id="button"
                            >
                                Subscribe
                            </Button>
                            </Row>
                        </CardBody>
                                </Col>
                            ))}
                            
                    </ModalBody>
                </Modal>
                </Row>  
                <div id="mybutton">
                    <Button className="expense">Add Expense</Button>
                </div>
                
            </Container>
        </Container>
    )
}

export default Dashboard;