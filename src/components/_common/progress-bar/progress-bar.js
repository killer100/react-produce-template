import React from 'react';
import './styles.css';

const Theme = {
    primary: {
        backgroundWrapper: '#ff8085',
        backgroundBar: '#dc3545'
    },
    secondary: {
        backgroundWrapper: '#eee',
        backgroundBar: '#ddd'
    }
};

const ProgressBar = ({
    width,
    height,
    marginTop,
    theme,
    show,
    defaultBackgroundPrimary,
    className
}) => (
    <div
        className={className}
        style={{ height: height, backgroundColor: defaultBackgroundPrimary ? '#dc3545' : 'none' }}
    >
        {show && (
            <div
                className="material-progress-bar"
                style={{ height: height, backgroundColor: Theme[theme].backgroundWrapper }}
            >
                <div
                    className="material-progress-bar-indeterminate"
                    style={{ backgroundColor: Theme[theme].backgroundBar }}
                />
            </div>
        )}
    </div>
);

ProgressBar.defaultProps = {
    className: '',
    theme: 'primary',
    width: 50,
    height: 8,
    marginTop: 0,
    show: false,
    defaultBackgroundPrimary: false
};

export default ProgressBar;
