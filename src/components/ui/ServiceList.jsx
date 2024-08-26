import React from "react";
import { Col } from "reactstrap";
// import "../../styles/services-list.css";
import servicesData from "../../assets/data/serviceData";

const ServicesList = () => {
  return (
    <>
      {servicesData.map((item) => (
        <ServiceItem item={item} key={item.id} />
      ))}
    </>
  );
};

const ServiceItem = ({ item }) => (
  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item p-4 shadow-lg rounded-lg bg-white text-center hover:bg-gray-100 transition-all duration-300">
      <span className="mb-3 inline-block text-yellow-500">
        <i className={item.icon} style={{ fontSize: "2.5rem" }} />
      </span>

      <h6 className="text-lg font-semibold hover:text-yellow-500 transition-colors duration-300">
        {item.title}
      </h6>
      <p className="text-gray-600">{item.desc}</p>
    </div>
  </Col>
);

export default ServicesList;
