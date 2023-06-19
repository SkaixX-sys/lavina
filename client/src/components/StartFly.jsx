import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function StartFly() {
  return (
    <Row className="mt-5 d-flex justify-content-end me-5">
      <Col md={3} className='d-flex flex-column align-content-start'>
        <h3 className='display-5' style={{fontWeight:'700'}}>Катайся как <br></br>Хочешь, на <br></br>Наших<br></br> Склонах</h3>
        <p className='mt-5 mb-5'>Наши подъемники смогут доставить вас практически на любую высоту.</p>
        <div variant="" className="d-flex align-content-center">
           <img className='me-3' src="./src/assets/icons/arrowToButton.png" alt="arrow" />Начать Летать
        </div>
      </Col>
      <Col md={1}></Col>
      <Col md={7}>
        <img src='./src/assets/fly.png' alt="fly" className="mt-5 img-fluid" />
      </Col>
    </Row>
  );
}

export default StartFly;