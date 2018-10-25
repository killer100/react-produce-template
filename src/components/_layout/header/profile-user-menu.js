import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import TextLoader from '../../_common/text-loader';

const ProfileUserMenu = ({ userFullName }) => {
    if (!userFullName)
        return (
            <NavItem>
                <TextLoader width={150} />
                <TextLoader width={100} marginTop={5} />
            </NavItem>
        );
    return (
        <NavDropdown
            id="__nav__profile__user__menu"
            title={
                <span>
                    <i className="fa fa-user-circle-o fa-lg" /> {userFullName}
                </span>
            }
        >
            <MenuItem>
                <i className="fa fa-user" /> Perfil
            </MenuItem>
            <MenuItem>
                <i className="fa fa-gear" /> Configuración
            </MenuItem>
            <MenuItem>
                <i className="fa fa-key" /> Cambiar contraseña
            </MenuItem>
            <MenuItem divider />
            <MenuItem>
                <i className="fa fa-sign-out" /> Cerrar sesión
            </MenuItem>
        </NavDropdown>
    );
};

export default ProfileUserMenu;
