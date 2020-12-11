import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import { CreditCard, Activity, DollarSign } from 'react-feather'
import classnames from 'classnames';
import './Profile.css'
import AddCard from './AddCard'
import AddExpenses from './AddExpenses'
import ShowExpenses from './ShowExpense'
import ShowCard from './ShowCard'


const TabProfile = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <CreditCard size={18}/> Cards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <Activity size={18}/> Card Status
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            <DollarSign size={18}/> Expenses
          </NavLink>
        </NavItem>
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

              <h5>This section is still in construction. We'll get it ready for you ASAP! ^^ </h5>

            
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row >
            <Container className="rowright">
            <AddExpenses/>
            </Container>
            <ShowExpenses/>
        </Row>
        <Row>
        {/* <ShowSubscriptions/>     */}
        </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default TabProfile;