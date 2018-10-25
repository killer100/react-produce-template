import React from 'react';
import injectSheet from 'react-jss';
import TextLoader from '../../_common/text-loader';

const styles = {
    root: {
        textAlign: 'center',
        marginTop: 100
    }
};

const LoadingUserInfo = ({ classes }) => (
    <div className={classes.root}>
        <span>Cargando información de usuario</span>

        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <TextLoader width="100%" marginTop={20} height={10} theme="secondary" />
            </div>
        </div>
    </div>
);

export default injectSheet(styles)(LoadingUserInfo);
