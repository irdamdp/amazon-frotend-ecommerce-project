import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.backToTop} onClick={scrollToTop}>
        Back to top
      </div>
      
      <div className={classes.footerLinks}>
        <div className={classes.footerColumn}>
          <h3>Get to Know Us</h3>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div className={classes.footerColumn}>
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
          </ul>
        </div>
        <div className={classes.footerColumn}>
          <h3>Amazon Payment Products</h3>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>
        <div className={classes.footerColumn}>
          <h3>Let Us Help You</h3>
          <ul>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <div className={classes.footerLogo}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt="Amazon Logo"
          />
        </div>
        <div className={classes.footerCopy}>
          &copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
