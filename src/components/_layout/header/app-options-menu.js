import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import TextLoader from '../../_common/text-loader';

const AppOptionsMenu = ({ options }) => {
    if (options.length === 0)
        return (
            <NavItem>
                <TextLoader width={250} />
                <TextLoader width={150} marginTop={5} />
            </NavItem>
        );

    return options.map((menu, index) => {
        if (typeof menu.children === 'undefined' || menu.children == null) {
            return (
                <NavItem
                    active={window.location.pathname === menu.to}
                    key={index}
                    componentClass={Link}
                    href={menu.to}
                    to={menu.to}
                >
                    {' '}
                    {menu.label}
                </NavItem>
            );
        } else {
            return (
                <NavDropdown title={menu.label} key={index} id={'__nav__options__menu__' + index}>
                    {menu.children.map(
                        (item, item_index) =>
                            item.divider ? (
                                <MenuItem key={item_index} divider />
                            ) : (
                                <MenuItem
                                    active={window.location.pathname === item.to}
                                    key={item_index}
                                    componentClass={Link}
                                    href={item.to}
                                    to={item.to}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                    )}
                </NavDropdown>
            );
        }
    });
};

export default AppOptionsMenu;
