import { Col, Divider, Row } from "antd";
import React from "react";
import "./style.css";
const Footer = () => {
  return (
    <div className="footer padding-main">
      <Row justify="center">
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <img
            src={
              "https://masara.ro/wp-content/uploads/2021/10/Asset-1-8.png"
            }
            alt="icon"
            className="icon-width"
          />
          <h4>Mail: office@masara.ro</h4>
          <h4>Tel: +40 (786) 513 433</h4>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <h3><a href="https://masara.ro/termeni-si-conditii">TERMENI SI CONDITII</a></h3>
          <h3><a href="https://masara.ro/politica-de-retur">POLITICĂ DE RETUR</a></h3>
          <h3><a href="https://masara.ro/garantie-declaratie-conformitate.pdf">DECLARATIE CONFORMITATE SI GARANTIE</a></h3>
          <h3><a href="https://masara.ro/termeni-si-conditii">ANPC</a></h3>
          <Divider />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <h3>FII LA CURENT CU ULTIMELE NOUTATI</h3>
          <Divider />
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
