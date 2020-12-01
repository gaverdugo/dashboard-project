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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import trae from "trae";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      labels: [],
      chartData: []
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  prettyHour(time) {
    let localeSpecificTime = time.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  componentDidMount() {
    console.log("Getting chart data");
    trae.get("http:localhost:1108/api/Stats")
    .then((response) => {
      this.setState({
        chartData: response.results
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Entradas
                      </h6>
                      <h2 className="text-white mb-0">Ultimas 6 horas</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={{
                        labels: this.state.labels,
                        datasets: [
                          {
                            label: "Entradas",
                            data: this.state.data
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              gridLines: {
                                color: "#212529",
                                zeroLineColor: "#212529"
                              },
                              ticks: {
                                callback: function(value) {
                                  if (!(value % 10)) {
                                    return value;
                                  }
                                }
                              }
                            }
                          ]
                        },
                        tooltips: {
                          callbacks: {
                            label: function(item, data) {
                              var label = data.datasets[item.datasetIndex].label || "";
                              var yLabel = item.yLabel;
                              var content = "";
                    
                              if (data.datasets.length > 1) {
                                content += label;
                              }
                    
                              content += yLabel;
                              return content;
                            }
                          }
                        }
                      }}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
