import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from './confirm';
import { BrowserRouter as Router } from 'react-router-dom';

//confirmation: PropTypes.any
//options     : PropTypes.object
//{
//  okText    : PropTypes.string,
//  cancelText: PropTypes.string,
//}
export default function(confirmation, options = {}) {
    const wrapper = document.body.appendChild(document.createElement('div'));

    const promise = new Promise((resolve, reject) => {
        try {
            ReactDOM.render(
                <Router>
                    <Confirm dispose={dispose} resolve={resolve} reject={reject} {...options}>
                        {confirmation}
                    </Confirm>
                </Router>,
                wrapper
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    function dispose() {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(wrapper);
            setTimeout(() => document.body.removeChild(wrapper));
        }, 0);
    }
    // You can pass whatever you want to the component. These arguments will be your Component's props

    return promise.then(
        result => {
            dispose();
            return result;
        },
        result => {
            dispose();
            //return Promise.reject(result);
            return result;
        }
    );
}
