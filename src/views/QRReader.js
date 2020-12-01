/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  FormGroup,
  Form,
  Input,
  Button,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import trae from "trae";

class QRReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    }
  }

  handleChange = (e) => {
    this.setState({userId: e.target.value})
  }

  handleForm = async (e) => {
    e.preventDefault();
    const data = {
      id_usuario: this.state.userId
    };

    await fetch("http://localhost:1108/api/Acceso/", {
      method: 'post',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    this.props.history.push("/admin/verified");
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Leer QR</h3>
                </CardHeader>
                <Form onSubmit={this.handleForm}>
                  <Col md="12">
                    <Row>
                      <Col md="8">  
                          <FormGroup>
                            <Input
                              id="qr-read-input"
                              placeholder="Introduzca el código QR"
                              type="text"
                              autoFocus="true"
                              onChange={this.handleChange}
                              />
                          </FormGroup>
                      </Col>
                      <Col md="4">
                        <Button color="primary" block>Submit</Button>
                      </Col>
                    </Row>
                  </Col>
                </Form>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default QRReader;
