import React from 'react';
import { WithUser } from '../../../config/user-context';
import TableExample from './table-example';

class Opcion1Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                opcion 1 {user.fullname}
                <TableExample />
            </div>
        );
    }
}

export default WithUser(Opcion1Container);
