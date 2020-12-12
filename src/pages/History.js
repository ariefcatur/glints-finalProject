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
    Collapse,
    ModalBody
    
} from 'reactstrap';
import {
    Element,
} from 'react-scroll'
import { Link } from 'react-router-dom';
import { Line } from '@reactchartjs/react-chart.js'
import axios from 'axios';
import {checkLogin} from '../Helper';
import Cookies from 'js-cookie'

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

const History = () =>{ 
    const [history, setHistory]=useState([]);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenWeek, setIsOpenWeek] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = Cookies.get('token');
    const fullName = Cookies.get('fullName')
    const [expense, setExpense]=useState([]);
    const [subscribeId, setSubscribeId] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartWeek, setChartWeek] = useState({});
    const [weekMonth, setWeekMonth] = useState([]);
    const [totalWeek, setTotalWeek] = useState([]);
    const [dates, setDates] = useState([]);
    const [totals, setTotals] = useState([]);
    const [totalHistory, setTotalHistory] = useState({})
    const urlMonth='http://3.0.91.163/chart/monthly'
    const urlWeek='http://3.0.91.163/chart/weekly'

    // console.log(token)

    const urlHistory ='http://3.0.91.163/subscription'
    const urlExpense ='http://3.0.91.163/expense'
    const urlTotalHistory = 'http://3.0.91.163/history'

    const toggle = () =>setModal(!modal);
    const collapse = () => {setIsOpen(true); setIsOpenWeek(false)}
    const collapseWeek = () => {setIsOpenWeek(true); setIsOpen(false);}
    
    useEffect(()=>{
        setIsLoading(true);
        axios
        .get(urlHistory, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            // console.log(res.data);
            setHistory(res.data);
            setIsLoading(false);    
        })
        .catch((err)=>console.log(err))

        axios.get(urlExpense, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            // console.log(res.data)
            setExpense(res.data);
            setIsLoading(false);
        })
        .catch((err)=> console.log(err));
        dataMonth();
        dataWeek();

        axios
        .get(urlTotalHistory, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            console.log(res.data);
            setTotalHistory(res.data);
            setIsLoading(false); 
        })
        .catch((err)=> console.log(err)); 
    }, [])
    
    const dataMonth =()=>  {
        let month = [];
        let pay = [];
         axios
         .get(urlMonth, {headers:{Authorization: `Bearer ${token}`}})
         .then((res)=>{
            //  console.log(res);
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
        // console.log(dates, totals)
        
    }

    const dataWeek =()=> {
        let week = [];
        let pay = [];
        axios
        .get(urlWeek, {headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{
            console.log(res);
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
    
    const handleRemove = (id) => {
        const url = `http://3.0.91.163/subscription/${id}/`;
        axios
        .delete(url, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{
            console.log(res.data);
            return window.location.reload();   
        })
        .catch((err)=>console.log(err))
    } 

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
    return(
        <Container fluid className="content">
            <Container>
            <Row>
            <Col xs="8">
            <Container>
                <Row className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Col xs="12"className="bg-default">
                    <Row>
                        <Col xs="6" >
                            <h4>Spending Value</h4>
                        </Col>
                        <Col xs="6">   
                        <div style={{float :'right', position:'relative',  }}> 
                        <Button id="button" onClick={collapse} style={{ marginBottom: '1rem',marginRight:'20px' }}>Month</Button>
                        <Button id="button" onClick={collapseWeek} style={{ marginBottom: '1rem', marginRight:'10px'}}>Week</Button>
                        </div>
                        </Col>
                    </Row>
                    </Col>
                    <Col xs="12">
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
                <h3>Your Subscribe</h3>
            </Row>
            </Container>
            <Container>
                <Row>
                    {history.map((history)=>(
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
                            <CardTitle tag="h6" className="text-dark font-weight-bold text-center">
                                {history.service.name}
                            </CardTitle>
                            <Row>
                            <Button
                                onClick={()=>{handleRemove(history.serviceId)}}
                                className="btn btn-primary btn-block"
                                id ="button"
                            >
                                Unsubcribe
                            </Button>
                            </Row>
                            </CardBody>
                        </Card>
                        </Col>
                    ))}
                </Row>
                {/* <Modal isOpen={modal} toggle={toggle} >
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
                                Unsubscribe
                            </Button>
                            </Row>
                            </CardBody>
                                </Col>
                            ))}
                            
                    </ModalBody>
                </Modal> */}
            </Container>
            </Col>
            
            <Col xs="4" style={{backgroundColor: 'white'}}> 
                <h4>history</h4>
                    <Card style={{marginTop: '20px', color:'white', backgroundColor: '#8F48EA', marginBottom:'20px'}}>
                        <Row>
                            <Col xs="6">
                            <CardTitle className="text-white"  > Total :
                            </CardTitle>
                            </Col>
                            <Col xs="6">
                            <h6 style={{float:"right", }}>IDR {totalHistory.total} </h6>
                            </Col>
                        </Row>
                    </Card>
                <Element ClassName="element" id="scroll-container" style={{
                    position: 'relative',
                    height: '700px',
                    overflow: 'scroll',
                    marginBottom: '100px'
                }}>
                <h4>Subscribe</h4>
                {history.map((subscribtion, i)=>(
                <Card key={i} style={{marginTop: '20px', backgroundColor: '#f6f9fc'}}>
                    <Row>
                    <Col xs="6">
                    <CardTitle className="text-dark font-weight"><h6>{subscribtion.service.name}  <br/> {subscribtion.repeat}</h6> 
                    </CardTitle>
                    </Col>
                    <Col xs="6">
                    <h6 style={{float:"right"}}>IDR  {subscribtion.service.cost} </h6>
                    </Col>       
                    </Row>
                </Card>
                ))}
                <h4>Expense</h4>
                {expense.map((expenses, i )=>(
                <Card key={i} style={{marginTop: '20px', backgroundColor: '#f6f9fc'}}>
                <Row>
                    <Col xs="6">
                    <CardTitle tag="h6" className="text-dark font-weight-bold"><h6>{expenses.title} <br/> {expenses.purchaseDate}</h6></CardTitle>
                    </Col>
                    <Col xs="6">
                    <h6 style={{float:"right"}}>IDR  {expenses.total} </h6>
                    </Col>  
                </Row>  
                </Card> 
                ))}
                </Element>
            </Col>
            </Row>
            </Container>
        </Container>
    )
}

export default History;