import React from 'react';
import PropTypes from 'prop-types';
import ModalBootstrap from 'react-bootstrap/lib/Modal';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import ProgressBar from '../progress-bar';
import { withRouter } from 'react-router';

const styles = {
    modal: {
        textAlign: 'center',
        padding: '0!important',
        overflowY: 'auto!important',

        '&:before': {
            content: '""',
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'middle',
            marginRight: -4
        },
        '& .modal-dialog': {
            display: 'inline-block!important',
            textAlign: 'left!important',
            verticalAlign: 'middle!important'
        }
    },
    modalHeader: {
        borderBottom: '0!important'
    },
    progressContainer: {
        height: 8
    }
};

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            open: true
        };
    }

    handleDismiss = () => {
        this.setState({ open: false });
        this.props.reject(false);
    };

    handleClose = () => {
        this.props.resolve(true);
        this.setState({ open: false });
    };

    setLoading = bool => () => {
        this.setState({ loading: bool });
    };

    componentDidMount() {
        this.unlistenChangeRoute = this.props.history.listen((location, action) => {
            this.handleDismiss();
        });
    }

    componentWillUnmount() {
        this.unlistenChangeRoute();
    }

    render() {
        const { open, loading } = this.state;
        const { classes, title, props, size, modalProps } = this.props;

        return (
            <ModalBootstrap
                className={classnames(classes.modal, 'modal-custom', 'modal-overflow')}
                animation={false}
                show={open}
                onEnter={this.handleOpen}
                onHide={this.handleDismiss}
                aria-labelledby="modal"
                aria-describedby="modal dialog"
                bsSize={size}
                backdrop="static"
                {...modalProps}
            >
                <ModalBootstrap.Header closeButton className={classes.modalHeader}>
                    <ModalBootstrap.Title>{title}</ModalBootstrap.Title>
                </ModalBootstrap.Header>
                <ProgressBar show={loading} height={8} />
                <this.props.component
                    close={this.handleClose}
                    dismiss={this.handleDismiss}
                    showLoading={this.setLoading(true)}
                    hideLoading={this.setLoading(false)}
                    loading={loading}
                    {...props}
                />
            </ModalBootstrap>
        );
    }
}

Modal.defaultProps = {
    size: null
};

Modal.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    resolve: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired
};

export default injectSheet(styles)(withRouter(Modal));
