import React from "react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";

const Header = () => {
  return (
      <header className="header">
        <Image width={50} alt="Logo Image" src="./public/logo.png"></Image>
        <nav className="nav">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="#about-us">About</a></li>
            <li><a href="#all-doctors">All Doctors</a></li>
            <li><a href="#hotline">Hotline</a></li>
          </ul>
        </nav>
        <Button color="primary">Create Account</Button>
      </header>
  );
};

export default Header;
