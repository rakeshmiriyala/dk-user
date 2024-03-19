// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const [formData, setFormData] = useState({
    shipping_customer_name: '',
    shipping_last_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_pincode: '',
    shipping_state: '',
    shipping_country: '',
    shipping_email: '',
    shipping_phone: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const order_id = Math.floor(Math.random() * 240700) + 1;
    const order_date = new Date().toISOString().split('T')[0];
    const shipping_is_billing = false;
    const payment_method = 'Prepaid';
    const completeFormData = {
      ...formData,
      order_id,
      order_date,
      shipping_is_billing,
      payment_method
    };
    const ok = sessionStorage.getItem('SelectedThings')
    const ok2 = JSON.parse(ok);
    const something = { ...completeFormData, ...ok2 };
    var raw = JSON.stringify(something);
    console.log(raw);
    sessionStorage.setItem("raw",raw)
   navigate('/payment')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    return (
      <div className="checkout-container bg-black min-h-screen flex flex-col justify-center items-center">
      <ul className="steps font-sans text-white mt-4">
          <li className="step step-primary">Product</li>
          <li className="step step-primary">File Upload</li>
          <li className="step step-primary">Checkout</li>
          <li className="step">Payment</li>
          <li className="step">Thanking You</li>
        </ul>
      <br />
      <div className="checkout-form bg-white p-6 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3">
        <h2 className="text-center text-3xl text-black font-semibold mb-6">Check out</h2>
        <form onSubmit={handleSubmit} className="">
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-base font-bold text-black">
                {key.replace(/_/g, ' ').replace('shipping customer', 'first').replace('shipping', ' ')}:
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 mb-4 text-black font-bold bg-white border rounded-md text-sm"
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md md:px-6"
            >
              Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Checkout;