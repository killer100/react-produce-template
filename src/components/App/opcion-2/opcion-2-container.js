import React from 'react';
import { WithUser } from '../../../config/user-context';

class Opcion2Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { user } = this.props;
        return <div>opcion 2 {user.fullname}</div>;
    }
}

export default WithUser(Opcion2Container);
