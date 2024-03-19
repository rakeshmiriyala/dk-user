import React, { useState, useEffect } from "react";
import Rating from "./Rating";

function Order() {
  const [order, setOrder] = useState("");

  useEffect(() => {
    const orderData = sessionStorage.getItem("raw");

    if (orderData) {
      const { order_id } = JSON.parse(orderData);
      setOrder(order_id);
    }

    // Check if the page has not been reloaded yet
    if (!sessionStorage.getItem("hasReloaded")) {
      // Reload the page
      sessionStorage.setItem("hasReloaded", true);
      window.location.reload();
    }
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <div className="h-full ">
      <div className="ck w-full h-full flex flex-col bg-black">
        <div className="flex justify-center items-center mb-4">
          <ul className="steps font-sans text-white mt-4">
            <li className="step step-primary">Product</li>
            <li className="step step-primary">File Upload</li>
            <li className="step step-primary">Checkout</li>
            <li className="step step-primary">Payment</li>
            <li className="step step-primary">Thanking You</li>
          </ul>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <div className="lg:text-6xl text-5xl font-semibold text-white mb-4">
            THANK YOU
          </div>
          <p className="mb-6 text-white text-3xl font-bold">For Your Order</p>
          <p className="mb-6 text-white text-xl font-bold">Order id: {order} </p>
          <div className="flex flex-col lg:flex-row justify-center lg:space-x-2 mb-4">
            <a href="/" className="bg-purple-600 text-white font-bold px-6 py-4 rounded mb-2 lg:mb-0">
              Home
            </a>
            <a
              href="https://arw.shiprocket.co/tracking"
              className="bg-purple-600 text-white font-bold px-6 py-4 rounded mb-2 lg:mb-0"
            >
              Order Status
            </a>
            <a href="/#/product" className="bg-purple-600 text-white font-bold px-6 py-4 rounded">
              New Order
            </a>
          </div>
        </div>
        <Rating />
      </div>
    </div>
  );
}

export default Order;
