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

const TabProfile = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Cards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Expenses
          </NavLink>
        </NavItem>
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
              <AddExpenses />
            </Container>
            <ShowExpenses />
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TabProfile;
