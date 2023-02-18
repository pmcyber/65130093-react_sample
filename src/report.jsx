import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Common from "./common";
import Image from 'react-bootstrap/Image';
const BASE_URL = Common.API_URL;
export default class report extends Component {
  state = {
    zipcode: 70000,
    amphur_code: 0,
    amphur_name: "",
    province_code: 0,
    province_name: "",
    district: [],
  };
  getData = async () => {
    if(this.state.zipcode <5){
return false;
    }
    try {
      await axios
        .get(`${BASE_URL}/${this.state.zipcode}`)
        .then((response) => {
          let res = response.data;

          if (res.district === undefined) {
            this.setState({
              district: [],
            });
          }
          this.setState({
            amphur_name: res.amphur_name,
            province_name: res.province_name,
            district: res.district,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  filter = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
    if(e.target.value.length==5){
      this.getData();
    }
    
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const { district } = this.state;
    return (
      <div>
        <Navbar bg="success" variant="dark">
          <Container>
            <Navbar.Brand href="#" >ค้นหาด้วยรหัสไปรษณีย์</Navbar.Brand>
            <ul class="navbar-nav me-auto"><li class="nav-item"><a href="#" class="text-light">Home</a></li></ul>
            <div class="text-light fw-bold">
              <Image  src="https://scontent.fbkk15-1.fna.fbcdn.net/v/t1.18169-9/206236_105439512874220_648208_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=fGeaPXKd7uEAX_GiSHK&_nc_oc=AQnNDCFJwnzoNUDgpeXIr_XRYPcgOUKuEpApzCHfWH5SMLn_U1x-f-KsY1Er8jjz_k0&_nc_ht=scontent.fbkk15-1.fna&oh=00_AfASFTnYLcpX0eyBanySo5F9CIGwdsY7bCF1b6JoKPkEGg&oe=6417FF0B" roundedCircle thumbnail me-5 style={{width:"50px",height:"50px"}} ></Image>
              {"65130093 ภัทรพงษ์ มีนุชนาถ"}</div>
           
          </Container>
        </Navbar>
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Row> 
              <Col lg="9">
                <div class="row g-3">
                  <div class="col-12 col-lg-auto h3">อำเภอ/เขต <span class="alert alert-primary p-2 rounded "> {this.state.amphur_name}</span> </div>
                  <div class="col-12 col-lg-auto h3">จังหวัด{" "} <span class="alert alert-primary p-2 rounded "> {this.state.province_name}</span></div>
                  <div class="col-12 col-lg-auto h3"> รหัสไปรษณีย์ <span class="alert alert-primary p-2 rounded "> {this.state.zipcode}
                    </span></div>
                  
                </div>
              </Col>
              <Col lg="3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ระบุเลขรหัสไปรษณีย์ 5 หลัก"
                    onChange={this.filter}
                    onKeyUp={this.filter}
                    maxLength="5"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสตำบล</th>
                      <th>ตำบล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district?.map((rs, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>{rs.district_code}</td>
                        <td>{rs.district_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

