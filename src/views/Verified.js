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
import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

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

import { CountdownCircleTimer } from "react-countdown-circle-timer";

// core components
import Header from "components/Headers/Header.js";

const RenderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);
  
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }
  
    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender(val => val + 1);
      }, 20);
    }
  
    const isTimeUp = isNewTimeFirstTick.current;
  
    return (
      <div className="time-wrapper">
        <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
          {remainingTime}
        </div>
        {prevTime.current !== null && (
          <div
            key={prevTime.current}
            className={`time ${!isTimeUp ? "down" : ""}`}
          >
            {prevTime.current}
          </div>
        )}
      </div>
    );
  };

function Verified() {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
      setTimeout(() => setRedirect(true), 46000);
    })
    return redirect ? <Redirect to="/admin/qr-read"/> : (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                  <Col md="12">
                      <h1 style={{textAlign: "center"}}>Bienvenido Usuario</h1>
                      <p style={{textAlign: "center"}}>Entre a la cabina y cierre la puerta, por favor.</p>
                      <div className="d-flex justify-content-center my-5">
                        <CountdownCircleTimer
                            isPlaying
                            duration={45}
                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                            >
                            {RenderTime}
                        </CountdownCircleTimer>
                    </div>
                  </Col>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
}

export default Verified;
