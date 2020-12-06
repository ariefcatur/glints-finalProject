import React from 'react'
import './Footer.css'
import { Container, Row, Table } from 'reactstrap'
import { Facebook, Twitter, Instagram } from 'react-feather'
import logo from '../assets/logo-subsit.png'

const Footer = () => {

    return (
        <Container fluid className="footer">
            <Container>
            <Row md="6" sm="12" style={{padding:"1%", marginTop:"1%"}}>
                <img 
                    src={logo}
                    alt=""
                    style={{width:"10%"}} 
                />
            </Row>
            <hr className="line"/>
            <Row>
                <Table className="footerTable" sm="6">
                    <tbody>
                        <tr>
                            <td>
                                <p><strong>About</strong></p>
                            </td>
                            <td>
                                <p>| Privacy Policy</p>
                            </td>
                            <td>
                                <p>Terms of Use</p>
                            </td>
                            <td>
                                <p>Our Company</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><strong>Contact</strong></p>
                            </td>
                            <td>
                                <p>| Customer Service</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p><strong>Connect</strong></p>
                            </td>
                            <td>
                                <p>| <Facebook/> Facebook</p>
                            </td>
                            <td>
                                <p><Twitter/> Twitter</p>
                            </td>
                            <td>
                                <p><Instagram/> Instagram</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <hr className="line"/>
            <p className="footerTable">Copyright &copy; 2020 SubsIt.com</p>     
            </Container>
        </Container>
    )
}

export default Footer;