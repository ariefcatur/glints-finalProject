<<<<<<< HEAD
import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";
// import { CreditCard, Activity, DollarSign } from 'react-feather'
import classnames from "classnames";
import "./Profile.css";
import AddCard from "./AddCard";
import AddExpenses from "./AddExpenses";
import ShowExpenses from "./ShowExpense";
// import ShowCard from "./ShowCard";
import CheckStatus from "./Status";
=======
import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Card } from 'reactstrap';
import { CreditCard, Activity, DollarSign } from 'react-feather'
import classnames from 'classnames';
import './Profile.css'
import AddCard from './AddCard'
import AddExpenses from './AddExpenses'
import ShowExpenses from './ShowExpense'
import ShowCard from './ShowCard'

>>>>>>> 7f80e1dd3b54b8424cb25d024bb462c82c195561

const TabProfile = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
<<<<<<< HEAD
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Cards
=======
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
>>>>>>> 7f80e1dd3b54b8424cb25d024bb462c82c195561
          </NavLink>
        </NavItem>
        </Card>
          </Col>
          <Col sm="3">
          <Card className="tabs"> 
        <NavItem>
          <NavLink
<<<<<<< HEAD
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Expenses
=======
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            <Row><Col sm="8"><h4> Dept </h4></Col><Col sm="4"  className="icon"><DollarSign size={18}/></Col></Row>
>>>>>>> 7f80e1dd3b54b8424cb25d024bb462c82c195561
          </NavLink>
        </NavItem>
        </Card>
          </Col> 
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {/* <Row>
            <Container className="mt-3 mb-2">
              <h4 className="align-items-center">Your Cards</h4>
            </Container>
            <ShowCard />
          </Row> */}
          <Row className="rowright">
            <Container>
              <AddCard />
            </Container>
          </Row>
          <Container>
            <h4 className="align-items-center">Your Cards</h4>
          </Container>
          <hr style={{ borderTop: "2px solid #c8c8c8" }} />
          <Row>
            <CheckStatus />
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Container className="rowright">
<<<<<<< HEAD
              <AddExpenses />
            </Container>
            <ShowExpenses />
          </Row>
=======
            
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
        </Row>
        <Row>
        {/* <ShowSubscriptions/>     */}
        </Row>
>>>>>>> 7f80e1dd3b54b8424cb25d024bb462c82c195561
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default TabProfile;
