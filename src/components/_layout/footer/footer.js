import React from 'react';

const Footer = ({ nombreSistema }) =>
  <footer className="footer-principal">
    <div className="container text-center">
      <p className="text-muted">© Derechos reservados 2018 – PRODUCE – {nombreSistema}</p>
    </div>
  </footer>;

export default Footer;