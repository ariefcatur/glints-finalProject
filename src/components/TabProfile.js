import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Card } from 'reactstrap';
import { CreditCard, Activity, DollarSign } from 'react-feather'
import classnames from 'classnames';
import './Profile.css'
import AddCard from './AddCard'
import AddExpenses from './AddExpenses'
import ShowExpenses from './ShowExpense'
import ShowCard from './ShowCard'
import CheckStatus from './Status'
import Debt from './Debt'


const TabProfile = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Container fluid>
      <Nav>
        <Col md="3">
          <Card className="tabs">
          <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                <Row><Col sm="8"><h4> Cards </h4></Col><Col sm="4" className="icon"><CreditCard size={19}/></Col></Row>
              </NavLink>
            </NavItem>
            </Card>
          </Col> 
          <Col sm="3">
          <Card className="tabs"> 
          <NavItem>
            
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <Row><Col sm="8"><h4> Cards </h4></Col><Col sm="4"  className="icon"><Activity size={19}/></Col></Row>
          </NavLink>
        </NavItem>
        </Card>
          </Col> 
          <Col sm="3">
          <Card className="tabs"> 
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            <Row><Col sm="9"><h4> Expense </h4></Col><Col sm="3" className="icon"><DollarSign size={18}/></Col></Row>
          </NavLink>
        </NavItem>
        </Card>
          </Col>
          <Col sm="3">
          <Card className="tabs"> 
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            <Row><Col sm="8"><h4> Dept </h4></Col><Col sm="4"  className="icon"><DollarSign size={18}/></Col></Row>
          </NavLink>
        </NavItem>
        </Card>
          </Col> 
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <Row className="rowright">
            <Container>
            <AddCard/>
            </Container>
        </Row>
        <Row>
          <ShowCard/>
        </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col l="12" xl="12" className="d-flex mt-5 align-items-center">
              <CheckStatus />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row >
            <Container className="rowright">
            
            </Container>
            <ShowExpenses/>
        </Row>
        <AddExpenses/>
        <Row>
        {/* <ShowSubscriptions/>     */}
        </Row>
        </TabPane>
        <TabPane tabId="4">
        <Row >
            <Container className="rowright">
            
            </Container>
            <Debt/>
        </Row>
        {/* <Row>
        {/* <ShowSubscriptions/>     */}
        {/* </Row>  */}
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default TabProfile;