import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { CreditCard, Activity, DollarSign } from 'react-feather'
import classnames from 'classnames';
import './Profile.css'
import AddCard from './AddCard'
import AddExpenses from './AddExpenses'
import ShowExpenses from './ShowExpense'
import ShowCard from './ShowCard'

const TabProfile = (props) => {
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
            <CreditCard size={22}/> Cards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <Activity size={22}/> Card Status
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            <DollarSign size={22}/> Expenses
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
            {/* <Col xl="4" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>
                        </CardTitle>
                        <CardText>
                            <p>Card Number: 1122334455667788</p>
                            <p>Card Type: Master</p>
                            <p>Balance: Rp 1000000</p>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="4" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5>BNI</h5>
                        </CardTitle>
                        <CardText>
                            <p>Card Number: 1122334455667788</p>
                            <p>Card Type: Master</p>
                            <p>Balance: Rp 1000000</p>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="4" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5>BNI</h5>
                        </CardTitle>
                        <CardText>
                            <p>Card Number: 1122334455667788</p>
                            <p>Card Type: Master</p>
                            <p>Balance: Rp 1000000</p>
                        </CardText>
                    </CardBody>
                </Card>
            </Col> */}
        </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {/* <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col> */}
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