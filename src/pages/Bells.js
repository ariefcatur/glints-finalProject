import React, { useEffect, useState } from "react";
import { Bell } from "react-feather";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import Moment from 'react-moment';

const Bells = () => {
  const [notif, setNotif] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const token = Cookies.get("token");

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://52.148.70.171/subscription", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotif(res.data);
      });
    console.log("setNotif", setNotif);
  }, []);

  let tanggal = new Date();

  const maxDate = new Date(tanggal);
  maxDate.setDate(maxDate.getDate() + 3);
  //console.log("tanggal")
  let checkDueDate = notif.filter((e) => new Date(e.dueDate) <= maxDate);
  //console.log("cek due date", checkDueDate)
  // if(tanggal<checkDueDate){
  //     console.log("tampilkan notif")
  // }
  // else{
  //     console.log("notif ngak ada")
  // }
  return (
    <div>
      <div id="Popover1" >
        <Bell style={{cursor:"pointer", color:"#8f48ea"}}/>
      </div>
      <Popover
        placement="right"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader style={{ textAlign: "center" }}>
          <strong>Due Date Notification</strong>
        </PopoverHeader>
        {checkDueDate.length !== 0 ? (
          checkDueDate.map((notif) => (
            <PopoverBody>
              <Container fluid>
                <Col>
                  <h6><strong>{notif.service.name}</strong></h6>
                  <h6><Moment format="D MMM YYYY">{notif.dueDate}</Moment></h6>
                </Col>
              </Container>
            </PopoverBody>
          ))
        ) : (
          <Container fluid>
            <Col style={{ textAlign: "center", marginTop: "15px" }}>
              <p>
                <i>You don't have any notification.</i>
              </p>
            </Col>
          </Container>
        )}
      </Popover>
    </div>
  );
};
export default Bells;
