import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/PaymentPage.css";

const Loader = () => (
  <div class="loader">
    <div class="circle">
      <div class="dot"></div>
      <div class="outline"></div>
    </div>
    <div class="circle">
      <div class="dot"></div>
      <div class="outline"></div>
    </div>
    <div class="circle">
      <div class="dot"></div>
      <div class="outline"></div>
    </div>
    <div class="circle">
      <div class="dot"></div>
      <div class="outline"></div>
    </div>
  </div>
);
const PaymentPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.dataset.payment_button_id = "pl_NJ0b4XDIM23Exr";

    const form = document.getElementById("razorpay-form");
    form.appendChild(script);

    return () => {
      form.removeChild(script);
    };
  }, []);

  useEffect(() => {
    function prevent() {
      window.history.forward();
    }

    setTimeout(prevent, 0);
    window.onload = function () {};
  }, []);

  const navigate = useNavigate();
  const [basePrice, setBasePrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchBasePrice = async () => {
      try {
        const response = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/product-details"
        );
        const data = response.data;
        setBasePrice(data[0].price);

        const response2 = await axios.get(
          "https://enthusiastic-puce-tights.cyclic.app/admin/cod-details"
        );
        const data2 = response2.data;
        setDeliveryCharges(data2[0].price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBasePrice();
  }, []);

  useEffect(() => {
    setTotalPrice(basePrice + deliveryCharges);
  }, [basePrice, deliveryCharges]);

  const [loading, setLoading] = useState(false);
  const ok = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem("userToken");
      let raw = JSON.parse(sessionStorage.getItem("raw"));
      raw = {
        ...raw,
        sub_total: basePrice + deliveryCharges,
        payment_method: "COD",
      };
      const raww = JSON.stringify(raw);
      const orderResponse = await axios.post(
        "https://defiant-cod-buckle.cyclic.app/address",
        { email, raww }
      );
      console.log("Order placed successfully:", orderResponse.data);
      const imageUrl = sessionStorage.getItem("imageUrl");
      const videoUrl = sessionStorage.getItem("videoUrl");
      const colourAndSizeString = sessionStorage.getItem("productThings");
      const colourAndSize = JSON.parse(colourAndSizeString);
      if (imageUrl) {
        const imageResponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/upload-image",
          { email, imageUrl }
        );
        console.log("Image uploaded successfully:", imageResponse.data);
      }
      if (videoUrl) {
        const videoResponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/upload-video",
          { email, videoUrl }
        );
        console.log("Video uploaded successfully:", videoResponse.data);
      }

      if (colourAndSize) {
        const colourr = colourAndSize.colour;
        const size = colourAndSize.size;

        const productresponse = await axios.post(
          "https://defiant-cod-buckle.cyclic.app/api/cosi",
          { email: email, colour: colourr, size: size }
        );
        console.log("Product uploaded successfully:", productresponse.data);
      }
      navigate("/order");
    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center mb-4">
        <ul className="steps font-sans text-white mt-4">
          <li className="step step-primary">Product</li>
          <li className="step step-primary">File Upload</li>
          <li className="step step-primary">Checkout</li>
          <li className="step step-primary">Payment</li>
          <li className="step">Thanking You</li>
        </ul>
      </div>
      <div
        className="container mx-auto p-4 border font-sans border-gray-300 rounded-md"
        style={{ width: "300px" }}
      >
        <h1 className="text-3xl text-center font-bold mb-4">Payment</h1>
        <div className="mt-4">
          <p className="font-semibold text-red-500">
            Note: No cancellation of the order.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">COD</h2>
          <div className="flex justify-between items-center">
            <p>Price:</p>
            <p>{basePrice}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p> Charges:</p>
            <p>+ {deliveryCharges}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold">Total:</p>
          <p className="font-semibold">{totalPrice}</p>
        </div>
        <div className="mt-4 text-center">
          {loading && (
            <div className="loading-overlay">
              <Loader />
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={ok}
          >
            {loading ? "Placing Order..." : "Place order"}
          </button>
        </div>
        <div className="mt-2">
          <p className="text-center text-gray-500">or</p>
        </div>
        <div className="mt-2 text-center ">
          <h2 className="text-xl text-left font-semibold mb-2">
            Online Payment
          </h2>
          <div className="flex justify-between items-center gap-3 mb-5">
            <p>Product Price:</p>
            <p>{basePrice}</p>
          </div>

          <form id="razorpay-form"></form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
