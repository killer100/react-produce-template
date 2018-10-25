export const FetchUserData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                fullname: 'usuario prueba',
                roles: ['coordinador']
            });
        }, 500);
    });
};

export const GetUserData = () => {
    const u = window.$$userinfo;
    delete window.$$userinfo;
    return u;
};
