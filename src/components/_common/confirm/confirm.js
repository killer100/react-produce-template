import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { withRouter } from 'react-router';

const styles = {
    modal: {
        textAlign: 'center',
        padding: '0!important',

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
    }
};

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledButtons: false,
            open: true
        };
    }

    enableButtons() {
        const { disabledButtons } = this.state;
        if (disabledButtons) {
            this.setState({ disabledButtons: false });
        }
    }

    disableButtons() {
        this.setState({ disabledButtons: true });
    }

    handleDismiss = () => {
        this.setState({ open: false });
        this.props.reject(false);
    };

    handleConfirm = () => {
        this.disableButtons();
        this.props.resolve(true);
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.enableButtons();
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
        const { disabledButtons, open } = this.state;
        const { classes, okText, cancelText, children } = this.props;

        return (
            <Modal
                bsSize="small"
                className={classnames(classes.modal, 'modal-custom')}
                animation={false}
                show={open}
                onEnter={this.handleOpen}
                onHide={this.handleDismiss}
                aria-labelledby="confirm"
                aria-describedby="confirm dialog"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title>Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleDismiss}
                        disabled={disabledButtons}
                        bsStyle="default-custom"
                    >
                        {cancelText || 'Cancelar'}
                    </Button>
                    <Button
                        onClick={this.handleConfirm}
                        disabled={disabledButtons}
                        bsStyle="primary-custom"
                    >
                        {okText || 'Ok'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default injectSheet(styles)(withRouter(Confirm));

Confirm.propTypes = {
    children: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    resolve: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired
};
