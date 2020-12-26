import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container } from "reactstrap";

class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      fileName: "",
      img:"",
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
        this.setState({img: res})
      });
  }

  render() {
    return (
      <Container>
        <div className="row">
          <div className="col-md-6">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="file"
                  name="upload_file"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6">
                <button
                  type="submit"
                  classNam  e="btn btn-dark"
                  onClick={() => this.submit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default FileUpload;
