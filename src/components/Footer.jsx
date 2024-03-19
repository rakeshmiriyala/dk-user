/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  const iconSize = 32;

  return (
    <>
      <footer className="footer font-sans p-10 bg-black text-white">
        <nav>
          <header className="footer-title">Company</header>
          <a
            href="mailto:arw@augmentedrealitywardrobe.com"
            className="link link-hover"
          >
            arw@augmentedrealitywardrobe.com
          </a>
          <a href="tel:+917036205915" className="link link-hover">
            +91 7036205915
          </a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a href="/#/license-details" className="link link-hover">
            License
          </a>
        </nav>
        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com" className="social-icon">
              <FaTwitter size={iconSize} />
            </a>
            <a href="https://www.instagram.com/" className="social-icon">
              <FaInstagram size={iconSize} />
            </a>
            <a href="https://www.facebook.com/" className="social-icon">
              <FaFacebook size={iconSize} />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer font-serif footer-center p-4 bg-black text-white">
        <aside>
          <p>
            All rights reserved by{" "}
            <span>
              <a href="/" className="underline text-bold text-base">
                Dkdevops
              </a>
            </span>{" "}
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
