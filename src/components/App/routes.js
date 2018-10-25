import React from 'react';
import AclRouter from 'react-acl-router';
import HomeContainer from './home/home-container';
import Opcion1Container from './opcion-1/opcion-1-container';
import Opcion2Container from './opcion-2/opcion-2-container';
import NotFound from '../_layout/not-found';

const AUTH_ROUTES = [
    {
        path: '/opcion-1',
        exact: true,
        permissions: ['coordinador', 'director'],
        redirect: '/',
        component: Opcion1Container
    },
    {
        path: '/opcion-2',
        exact: true,
        permissions: ['admin', 'coordinador'],
        redirect: '/',
        component: Opcion2Container
    }
];

const NORMAL_ROUTES = [
    {
        path: '/',
        exact: true,
        component: HomeContainer
    }
];

const Routes = props => (
    <AclRouter
        authorities={props.roles}
        authorizedRoutes={AUTH_ROUTES}
        normalRoutes={NORMAL_ROUTES}
        notFound={NotFound}
        //authorizedLayout={BasicLayout}
        //normalLayout={NormalLayout}
    />
);

export default Routes;
