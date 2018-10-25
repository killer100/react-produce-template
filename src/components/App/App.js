import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../_layout/header';
import Footer from '../_layout/footer';
import { APP_INFO, UpdateMenuOptions } from '../../config/app-settings';
import { FetchUserData, GetUserData } from '../../api/user.api';
import { UserProvider } from '../../config/user-context';
import Routes from './routes';
import LoadingUserInfo from '../_layout/loading-user-info';
import Loading from 'react-loading-bar';
import { RegisterInterceptors } from '../../config/http';

class App extends React.Component {
    constructor(props) {
        super(props);

        const userInfo = this.getUserData();

        this.state = {
            ...userInfo,
            loading: false,
            _userDidLoad: true,
            date: null
        };
    }

    getUserData = () => {
        const user = GetUserData();
        return {
            user: user,
            menuOptions: UpdateMenuOptions(user.roles)
        };
    }

    registerInterceptors = () => {
        RegisterInterceptors(
            () => {
                this.setState({ loading: true });
            },
            () => {
                this.setState({ loading: false });
            }
        );
    };

    componentWillMount() {
        this.registerInterceptors();
    }

    render() {
        const { user, menuOptions, _userDidLoad, loading } = this.state;

        return (
            <Router>
                <UserProvider user={user}>
                    <Header
                        logoPrincipal={APP_INFO.logo}
                        nombreLogo={APP_INFO.nombreDesc}
                        userFullName={user.fullname}
                        menuOptions={menuOptions}
                    />

                    <div className="container contenido-principal">
                        <Routes roles={user.roles} />
                    </div>

                    <Footer nombreSistema={APP_INFO.nombreFooter} />
                    <Loading color="red" show={loading} />
                </UserProvider>
            </Router>
        );
    }
}

export default App;
