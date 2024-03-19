import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImage from '../assets/logo.png';

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const homeLink = "/";
  const profileLink = "/profile";
  const productLink = "/product";
  const orderLink = "https://arw.shiprocket.co/tracking";

  return (
    <div
      className={`flex justify-between font-sans items-center w-full h-20 px-4 text-white bg-cover bg-center relative`}
      style={{ zIndex: 2 }}
    >
      <div>
        <img src={logoImage} alt="Logo" className="h-12" />
      </div>
      <ul className="hidden md:flex">
        <li
          className="px-4 cursor-pointer capitalize text-xl text-white hover:scale-105 duration-200 font-semibold"
        >
          <Link to={homeLink}>Home</Link>
        </li>
        <li
          className="px-4 cursor-pointer capitalize text-xl text-white hover:scale-105 duration-200 font-semibold"
        >
          <Link to={profileLink}>Profile</Link>
        </li>
        <li
          className="px-4 cursor-pointer capitalize text-xl text-white hover:scale-105 duration-200 font-semibold"
        >
          <Link to={productLink}>Product</Link>
        </li>
        <li
          className="px-4 cursor-pointer capitalize text-xl text-white hover:scale-105 duration-200 font-semibold"
        >
          <Link to={orderLink}>Order</Link>
        </li>
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen bg-black text-white">
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} to={homeLink}>
              Home
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} to={profileLink}>
              Profile
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} to={productLink}>
              Product
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} to={orderLink}>
              Order
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
