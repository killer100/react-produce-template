import React from 'react';
import { WithUser } from '../../../config/user-context';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        const { user } = this.props;
        return (
            <div>
                Home {user.fullname}
            </div>
        );
    }
}

export default WithUser(HomeContainer);
