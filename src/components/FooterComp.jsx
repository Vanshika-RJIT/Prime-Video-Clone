import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="logo"></div>
      <ul className="footer-ul">
        <li className="footer-li">
          <button className="footer-anchor" onClick={() => {}}>
            Terms and Privacy Notice
          </button>
        </li>
        <li className="footer-li">
          <button className="footer-anchor" onClick={() => {}}>
            Send us feedback
          </button>
        </li>
        <li className="footer-li">
          <button className="footer-anchor" onClick={() => {}}>
            Help
          </button>
        </li>
        <li className="footer-li">
          <button className="footer-anchor" onClick={() => {}}>
            Cookies Notice
          </button>
        </li>
        <li className="footer-li">
          <button className="footer-anchor" onClick={() => {}}>
            Interest-Based Ads
          </button>
        </li>
      </ul>
      <p style={{ color: '#5a6872', fontSize: '12px' }}>
        © 1996-{year}, Amazon.com, Inc. or its affiliates
      </p>
    </footer>
  );
}

export default Footer;
