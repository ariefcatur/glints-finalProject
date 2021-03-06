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
  Card,
} from "reactstrap";
import { CreditCard, DollarSign } from "react-feather";
import classnames from "classnames";
import "./Profile.css";
import AddCard from "./AddCard";
import TopUp from "./TopUp";
import AddExpenses from "./AddExpenses";
import ShowExpenses from "./ShowExpense";
import CheckStatus from "./Status";
import Debt from "./AddDebt";
import ShowDebt from "./ShowDebt";
import EditDebt from "./EditDebt";
import { ShoppingCart } from "react-feather";

const TabProfile = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        paddingTop: "20px",
        minHeight: "700px",
      }}
    >
      <Nav>
        <Col md="4">
          <Card className="tabs">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                <Row>
                  <Container>
                    <h4>
                      <CreditCard size={20} /> Card
                    </h4>
                  </Container>
                </Row>
              </NavLink>
            </NavItem>
          </Card>
        </Col>
        <Col sm="4" className="flex">
          <Card className="tabs">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                <Row>
                  <Container>
                    <h4>
                      <ShoppingCart size={19} /> Expense
                    </h4>
                  </Container>
                </Row>
              </NavLink>
            </NavItem>
          </Card>
        </Col>
        <Col sm="4">
          <Card className="tabs">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                <Row>
                  <Container>
                    <h4>
                      <DollarSign size={19} /> Debt
                    </h4>
                  </Container>
                </Row>
              </NavLink>
            </NavItem>
          </Card>
        </Col>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="rowright">
            <Container>
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
              <Row style={{float:"right"}}>
              <AddCard />
              <TopUp/>
              </Row>
            </Container>
            <CheckStatus />
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="rowright">
            <Container>
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
              <AddExpenses />
            </Container>
            <ShowExpenses />
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row className="rowright">
          <Container>
              <hr style={{ borderTop: "2px solid #c8c8c8" }} />
              <Row style={{float:"right"}}>
              <Debt />
              <EditDebt/>
              </Row>
            </Container>
            <ShowDebt />
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default TabProfile;
