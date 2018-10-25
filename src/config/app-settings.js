import React from 'react';
import { Intersect } from '../utils/operations';

export const APP_INFO = {
    logo: 'SDP',
    nombreDesc: (
        <span>
            Sistema de
            <br />
            Prueba
        </span>
    ),
    nombreFooter: 'Sistema de Prueba versión 1.0'
};

export const MENU_OPTIONS = [
    { label: 'INICIO', to: '/' },
    {
        label: 'MÓDULO 1',
        only: ['coordinador', 'director', 'admin'],
        children: [
            { label: 'Opción 1', to: '/opcion-1', only: ['coordinador', 'director'] },
            { label: 'Opción 2', to: '/opcion-2', only: ['admin', 'coordinador'] },
            { divider: true },
            { label: 'Opción 3', to: '/opcion-3', only: ['director'] },
            { label: 'Opción 4', to: '/opcion-4', only: ['coordinador', 'director'] }
        ]
    }
];

export const UpdateMenuOptions = userRoles => {
    return MENU_OPTIONS.filter(x => {
        if (x.children) {
            x.children = x.children.filter(y => !y.only || Intersect(y.only, userRoles).length > 0);
        }
        return !x.only || Intersect(x.only, userRoles).length > 0;
    });
};
