import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import avatar from '../assets/avatar2.png'
import '../components/Profile.css'
import {User, Mail, MapPin, CreditCard, Activity, Smile} from 'react-feather'
import Edit from './EditProfile'
import AddCard from './AddCard'
import AddExpenses from './AddExpenses'

const Profile = () => {
    
    return (
        <Container className="profile">
            <Row className="rowright">
                <Container>
                <Edit/>
                </Container>
            </Row>
            <Row className="rowImg">
                <Container>
                <Col>
                <img
                src={avatar}
                alt='avatar'
                className="imgProfile"/>
                </Col>
                </Container>
            </Row>
            <Row className="row">
                <Col sm="3">
                    <Container>
                    <p><User size={22}/> Fullname</p>
                    </Container>
                </Col>                                    
                <Col sm="3">
                    <Container>
                    <p><Smile size={22}/> user123</p>
                    </Container>
                </Col>
                <Col sm="3">
                    <Container>
                    <p><Mail size={22}/> user@gmail.com</p>
                    </Container>
                </Col>
                <Col sm="3">
                    <Container>
                    <p><MapPin size={22}/> Bandung</p>
                    </Container>
                </Col>
            </Row>
            <Row className="row">   
                <Col md="6" sm="12">
                    <Container className="const">
                        <p><CreditCard size={22}/> Your Cards</p>
                        <hr className="line"/>
                        <p className="plus"><AddCard/></p>
                    </Container>
                </Col>
                <Col md="6" sm="12">
                    <Container className="const">
                        <p><Activity size={22}/> Card Status</p>
                        <hr className="line"/>
                    </Container>
                </Col>
            </Row>
            <Row className="row">   
                <Col md="12" sm="12">
                    <Container className="const">
                        <p><CreditCard size={22}/> Your AddExpenses</p>
                        <hr className="line"/>
                        <p className="plus"><AddExpenses/></p>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;