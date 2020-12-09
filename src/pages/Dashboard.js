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
    FormGroup,
    Input,
    Label
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
import {checkLogin} from '../Helper';
import Cookies from 'js-cookie';
import AddExpenses from '../components/AddExpenses';


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
    const token = Cookies.get('token');
    const [startDate, setStartDate] = useState(0)
    const [serviceId, setServiceId] = useState([])
    const [card,setCard] = useState([])
    const [cardId, setCardId] = useState(null)
    const urlCard = 'http://3.0.91.163/card'
    const [chartData, setChartData] = useState({});
    const [dates, setDates] = useState([]);
    const [totals, setTotals] = useState([]);
    const urlMonth='http://3.0.91.163/chart/monthly'
    const [chartWeek, setChartWeek] = useState({});
    const [weekMonth, setWeekMonth] = useState([]);
    const [totalWeek, setTotalWeek] = useState([]);
    const urlWeek='http://3.0.91.163/chart/weekly'

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
        
        dataMonth();
        dataWeek();
      }, []);
    
    const subscribeDetails = (id) => {
        setLoading(true);
        const url =`http://3.0.91.163/service?id=${id}`
        axios.get(url).then((res)=>{
            console.log("subscribe id", res.data)
            setSubscribeId(res.data);
            setModal(!modal)
            setLoading(false);
            subscribeCard()
            setServiceId(id)
        })
        .catch((err)=> console.log(err));           
    }

    
    const subscribeCard = () =>{
        setLoading(true);
        axios.get(urlCard, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            console.log(res.data)
            setCard(res.data);
            setLoading(false);
        })
        .catch((err)=> console.log(err));
    }
    
    const subscribtion = (e)=>{
        e.preventDefault();
        const url =`http://3.0.91.163/subscription/${serviceId}/?cardId=${cardId}`
        console.log("service Id ", serviceId, "cardId ", cardId)
        console.log(token)
        axios
        .post(url, null, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.error(error);
        });
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

      const dataMonth =()=>  {
        let month = [];
        let pay = [];
         axios
         .get(urlMonth, {headers:{Authorization: `Bearer ${token}`}})
         .then((res)=>{
            
             for(const dataObj of res.data){
                 month.push(dataObj.dates)
                 pay.push(dataObj.totals)
             }
             setChartData({
                labels: month,
                datasets:[
                    {
                        label: '# Month',
                        data: pay,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],  
            })
         }).catch((err)=>{
             console.log(err)
        });
        console.log(dates, totals)
        
    }
    
    const dataWeek =()=> {
        let week = [];
        let pay = [];
        axios
        .get(urlWeek, {headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{
            
            for(const dataObj of res.data){
                week.push(dataObj.weekMonth)
                pay.push(dataObj.totals)
            }
            setChartWeek({
               labels: week,
               datasets:[
                   {
                       label: '# Week',
                       data: pay,
                       fill: false,
                       backgroundColor: 'rgb(255, 99, 132)',
                       borderColor: 'rgba(255, 99, 132, 0.2)',
                   },
               ],  
           })
        }).catch((err)=>{
            console.log(err)
       });
       console.log(dates, totals)
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
                            <Line data={chartData}  options={options} />
                        </Collapse>
                        <Collapse isOpen={isOpenWeek}>
                            <Line data={chartWeek}  options={options} />
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
                                <ul>
                                    <li>
                                        <h5>
                                        Description: <br/>{subscribe.description}
                                        </h5>
                                    </li>
                                    <li>
                                        <h5>
                                        Cost: {subscribe.cost}
                                        </h5>
                                    </li>
                                </ul> 
                            </CardText>
                            <FormGroup>
                            <Label for="cardId">Select Card</Label>
                            </FormGroup>
                            <Row>
                            <Col md="8">
                            {/* {card.map((cards)=>(
                                <Select

                                value={cards.cardBank}/>
                            ))} */}
                            <Row>
                            <FormGroup>
                            <Input
                                type="select"
                                name="cardId"
                                id="cardId"
                                onChange={(e) =>{
                                    setCardId(e.target.value)
                                    console.log(e.target.value)
                                } }
                            >
                                <option >Select Card</option>
                            {card.length !== 0
                                ? card.map((cards) => <option value={cards.id}>{cards.cardBank}</option>)
                                : ("")}
                            </Input>
                            </FormGroup>
                            </Row>
                            </Col>
                            <Col>
                            <Button
                                onClick={subscribtion}
                                className="btn btn-primary"
                                id="button"
                            >
                                Subscribe
                            </Button>
                            </Col>
                            </Row>
                        </CardBody>
                                </Col>
                            ))}   
                    </ModalBody>
                </Modal>
                </Row> 
                <Row>
                <AddExpenses/>
                </Row> 
            </Container>
        </Container>
    )
}

export default Dashboard;