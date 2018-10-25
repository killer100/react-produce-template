import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FetchComments } from '../../../api/post.api';
import Modal from 'react-bootstrap/lib/Modal';

class Comments extends Component {
    state = {
        comments: []
    };

    async componentDidMount() {
        this.props.showLoading();
        try {
            const comments = await FetchComments(this.props.id);
            this.setState({ comments: comments });
        } catch (err) {
            console.log(err);
        }
        this.props.hideLoading();
    }

    render() {
        return (
            <div>
                <Modal.Body>
                    {this.state.comments.length == 0 && <span>Cargando comentarios</span>}
                    {this.state.comments.map(comment => (
                        <div key={comment.id} style={{ padding: 15 }}>
                            <div style={{ fontWeight: 'bold', marginTop: 15 }}>{comment.name}</div>
                            <div style={{ fontWeight: 'bold', marginTop: 15 }}>{comment.email}</div>
                            <p style={{ marginTop: 15 }}>{comment.body}</p>
                        </div>
                    ))}
                </Modal.Body>
            </div>
        );
    }
}

Comments.propTypes = {};

export default Comments;
