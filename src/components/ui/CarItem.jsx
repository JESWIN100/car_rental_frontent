import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="border border-gray-300 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">
          <img src="https://www.carandbike.com/_next/image?url=https%3A%2F%2Fc.ndtvimg.com%2F2021-05%2Fced9p7lg_rollsroyce-makes-coachbuilds-a-permanent-part-of-its-portfolio-with-the-new-boat-tail_625x300_27_May_21.jpg&w=3840&q=75" alt="" className="w-full rounded-lg" />
        </div>

        <div className="text-center">
          <h4 className="text-xl font-semibold">{carName}</h4>
          <h6 className="text-lg font-bold mt-2">
            ${price}.00 <span className="text-gray-500">/ Day</span>
          </h6>

          <div className="flex justify-between items-center mt-4 mb-6 text-gray-600">
            <span className="flex items-center gap-1">
              <i className="ri-car-line text-yellow-500"></i> {model}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-settings-2-line text-yellow-500"></i> {automatic}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-timer-flash-line text-yellow-500"></i> {speed}
            </span>
          </div>

          <div className="flex">
            <button className="w-1/2 bg-blue-900 text-white py-2 rounded-l-lg">
              <Link to={`/cars/${carName}`}>Rent</Link>
            </button>
            <button className="w-1/2 bg-yellow-500 text-white py-2 rounded-r-lg">
              <Link to={`/cars/${carName}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
