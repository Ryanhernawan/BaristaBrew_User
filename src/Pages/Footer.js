import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import globalCss from "../assets/global.css";
import instagramIcon from "../assets/logo.png"; // Import your Instagram icon
import 'feather-icons'
// import { FaInstagram } from "react-icons/fa"; // Import Instagram icon from react-icons library

export default function Navigation() {
  return (
    <>
      <footer className="footer">
        <Container>
          <div className="footer-content">
          <i data-feather="circle" color="red"></i>
            <a
              href="https://www.instagram.com/your_instagram_url"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <img
                src={instagramIcon} // Use your Instagram icon source
                alt="Instagram"
                className="instagram-icon"
              />
            </a>
            <a
              href="https://www.yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Website
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}
