import React from "react";
import {Link, Image} from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h4>&copy; {new Date().getFullYear()} 3alegny</h4>
        <p>
        We aim to be the leading application offering outstanding health care services 
        with the highest levels of quality standards.
        </p>
      </div>
      <div className="footer-links">
        <h4>Explore</h4>
        <ul>
          <li>
            <Link href="/" className="text-white" aria-current="page">Home</Link>
          </li>
          <li>
            <Link href="/about" className="text-white" aria-current="page">About</Link>
          </li>
          <li>
            <Link href="/doctors" className="text-white" aria-current="page">Doctors</Link>
          </li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Get in Touch</h4>
        <p>Hotline: 19191</p>
        <p>Email: support@3alegnyegypt.com</p>
      </div>
      <div>
        <Image width={150} alt="Logo Image" src="./public/3alegny_logo.jpg" />
      </div>
    </footer>
  );
};

export default Footer;
