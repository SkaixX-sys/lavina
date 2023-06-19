import React, { useEffect, useState } from "react";
import { getServices } from "../http/serviceAPI";
import { Container, Row, Col } from "react-bootstrap";
import ServiceItem from "./UI/ServiceItem";

function ServiceList() {
  const [serviceList, setServiceList] = useState([]);
  const fetchServices = async () => {
    try {
      const data = await getServices(7, 1);
      setServiceList(data.Model);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5} className="mb-4 text-center order-0">
          <h3 className="display-5 fw-bold">
            Познай <br />
            Лавину
          </h3>
        </Col>
        {serviceList.map((service) => (
          <Col md={5} key={service.id} className="">
            <ServiceItem
              type={service.type}
              title={service.title}
              description={service.description}
              image={service.image}
              id={service.id}
              isAuth={false}
              currentId={service.id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceList;
