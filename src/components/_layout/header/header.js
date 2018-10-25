import React from 'react';
import injectSheet from 'react-jss';
import LogoSection from './logo-section';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import ProfileUserMenu from './profile-user-menu';
import AppOptionsMenu from './app-options-menu';
const styles = {};

const Header = ({ siglasApp, logoPrincipal, nombreLogo, userFullName, menuOptions }) => (
    <div className="navbar-fixed-top">
        <LogoSection logoPrincipal={logoPrincipal} nombreLogo={nombreLogo} />
        <Navbar collapseOnSelect bsStyle="principal" staticTop>
            <Navbar.Header>
                <Navbar.Toggle />
                <Navbar.Brand className="visible-xs">
                    <a href="/">{siglasApp ? siglasApp : logoPrincipal}</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <AppOptionsMenu options={menuOptions} />
                </Nav>
                <Nav pullRight>
                    <ProfileUserMenu userFullName={userFullName} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

Header.defaultProps = {
    siglasApp: null
};

Header.propTypes = {
    siglasApp: PropTypes.string,
    logoPrincipal: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    nombreLogo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default injectSheet(styles)(Header);
