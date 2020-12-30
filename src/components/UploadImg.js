import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Button, Input, Row, Col } from "reactstrap";
import Swal from 'sweetalert2';

class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      fileName: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      fileName: event.target.files[0],
    });
  }

  submit() {
    const token = Cookies.get("token");
    const data = new FormData();
    data.append("file", this.state.fileName);
    console.warn(this.state.fileName);
    let url = "https://binar8-jul-hendri.nandaworks.com/files";

    axios
      .post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.warn(res);
        Swal.fire("Done!", "Your profile picture has been updated!", "success");
        return window.location.reload();
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Input
              type="file"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              block
              size="sm"
              type="submit"
              style={{backgroundColor:"#BA8FF2", marginBottom:"2%"}}
              onClick={() => this.submit()}
            >
              <b>Save</b>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FileUpload;
