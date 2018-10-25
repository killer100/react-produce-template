import React from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children, user }) => (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const WithUser = Component => props => (
    <UserContext.Consumer>{value => <Component {...props} user={value} />}</UserContext.Consumer>
);
