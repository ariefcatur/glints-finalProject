import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Cookies from "js-cookie";

const Calendar = () => {
  const [upComing, setUpComing] = useState([]);
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    document.body.style.backgroundColor = "#E5E5E5";

    setLoading(true);
    axios
      .get(" http://52.148.70.171/subscription", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.map((e) => e.dueDate));
        setUpComing(
          ...upComing,
          res.data.map((e) => ({
            title: e.service.name,
            date: e.dueDate.substr(0, 10),
          }))
        );
        setLoading(false);
      });
  }, []);

  let checkComingMonth = upComing.filter((e) => e.date.substr(5, 2) == month);
  // console.log("cek coming month" , checkComingMonth)
  checkComingMonth.sort((a, b) => {
    if (a.date < b.date) return -1;
    return a.date > b.date ? 1 : 0;
  });
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Container>
          <Row>
            <Col sm="8">
              <Card style={{ padding: "20px" }}>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  datesSet={(arg) => {
                    console.log(arg);
                    console.log(arg.view.currentStart.toISOString()); //starting visible date
                    console.log(arg.view.currentEnd.toISOString()); //ending visible date
                    setMonth(arg.view.currentEnd.toISOString().substr(5, 2));
                  }}
                  initialView="dayGridMonth"
                  // height ="100%"
                  events={upComing}
                  // events={[
                  // { title: "event 1", date: "2020-12-06" },
                  // { title: "event 2", date: "2020-12-12" },
                  //  ]}
                />
              </Card>
            </Col>
            <Col sm="4">
              <Card style={{ padding: "20px", minHeight: "500px" }}>
                <h4
                  style={{
                    color: "#222222",
                  }}
                  className="text-center"
                >
                  <strong>Events</strong>
                </h4>
                <hr style={{ borderTop: "2px solid #c8c8c8" }} />
                {checkComingMonth === undefined ||
                checkComingMonth.length == 0 ? (
                  <h5 className="text-center my-5">
                    <strong>
                      <i>No event found in this month.</i>
                    </strong>
                  </h5>
                ) : (
                  checkComingMonth.map((x) => (
                    <>
                      <div className="upcomingCard row">
                        <div className="upcoming card">
                          <h2 className="text-center">{x.date.substr(8, 2)}</h2>
                        </div>
                        <div className="upcomingDetail card">
                          <h2 className="">{x.title}</h2>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default Calendar;
