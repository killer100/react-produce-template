import React from 'react';

const LogoSection = ({ logoPrincipal, nombreLogo }) => (
    <header className="header-principal hidden-xs">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <a className="navbar-brand" href="/">
                        <span className="logo-principal">{logoPrincipal}</span>
                        <span className="nombre-logo-principal">{nombreLogo}</span>
                    </a>
                </div>
                <div className="col-md-6 text-right">
                    <img src="/static/img/logo-produce.png" alt="produce" />
                </div>
            </div>
        </div>
    </header>
);

export default LogoSection;
