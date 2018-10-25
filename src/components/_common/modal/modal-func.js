import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import { BrowserRouter as Router } from 'react-router-dom';

//options       : PropTypes.object
//{
//  title       : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
//  props       : PropTypes.object  Props del componente
//  size        : PropTypes.string  ["sm", "small", "lg", "large"],
//  modalProps  : PropTypes.object  Ver documentación https://react-bootstrap.github.io/components/modal/
//}

export default function(options = {}) {
    const wrapper = document.body.appendChild(document.createElement('div'));

    const promise = new Promise((resolve, reject) => {
        try {
            ReactDOM.render(
                <Router>
                    <Modal dispose={dispose} resolve={resolve} reject={reject} {...options} />
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

    return promise.then(
        result => {
            //onClose true
            dispose();
            return result;
        },
        result => {
            //onDismiss false
            dispose();
            return result;
        }
    );
}
