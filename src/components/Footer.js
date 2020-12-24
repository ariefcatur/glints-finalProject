import React from "react";
import "./Footer.css";
import { Container, Col, Row, Table } from "reactstrap";
import { Facebook, Twitter, Instagram, Linkedin } from "react-feather";
import gplay from "../pages/img/googleplay.png";
import appstore from "../pages/img/appstore1.png";
import crest from "../assets/logo-subsit.png";

const Footer = () => {
  return (
    <footer className="footer">
      <Container >
        <Container fluid style={{paddingTop:"30px"}}>
          {/* <Row md="6" sm="12" style={{ padding: "1%", marginTop: "1%" }}>
            <img src={crest} alt="" style={{ width: "10%" }} />
          </Row> */}
          <Row>
              <Container className="icons" style={{ textAlign: "center" }}>
                <Facebook
                  size={45}
                  style={{
                    color: "#222222",
                    fill: "#ba8ff2",
                    borderRadius: "100%",
                    backgroundColor: "#222222",
                  }}
                />
                <Twitter
                  size={45}
                  style={{
                    marginRight: "2%",
                    marginLeft: "2%",
                    color: "#222222",
                    fill: "#ba8ff2",
                    borderRadius: "100%",
                    backgroundColor: "#222222",
                  }}
                />
                <Instagram
                  size={45}
                  style={{
                    color: "#222222",
                    fill: "#ba8ff2",
                    borderRadius: "100%",
                    backgroundColor: "#222222",
                  }}
                />
              </Container>
          </Row>
          <Row>
              <Container style={{ textAlign: "center" }}>
              <Container>
                  <p><b>Terms of use | Privacy Policy</b></p>
              </Container>
              <img className="store" src={gplay} alt=""/>
              <img className="store" src={appstore} alt=""/>
              </Container>
          </Row>
          {/* <Row>
              <Container fluid className="icons" style={{ textAlign: "center" }}>
                <p>
                  <b>
                    Angelia Purnamasari | Jul Hendri | Rifkli Danny Prakoso |
                    Muhammad Agiel Nugraha | Ikhwan Bayu A S | Mochamad Dalvin |
                    Muhammad Arief Catur Prakoso | Lingga Alif Pratama |
                    Swastika Raisa
                  </b>
                </p>
              </Container>
          </Row> */}
          <b>
            <p className="footerTable">
              Copyright &copy; 2020 SubsItId.herokuapp.com
            </p>
          </b>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
