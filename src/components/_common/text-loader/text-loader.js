import React from 'react';
import InjectSheet from 'react-jss';

const animationId = Math.floor(Math.random() * 1000 + 1);

const Theme = {
    primary: {
        backgroundWrapper: '#e55358',
        backgroundBar: '#af1a1f'
    },
    secondary: {
        backgroundWrapper: '#eee',
        backgroundBar: '#ddd'
    }
};

const styles = {
    wrapper: {
        padding: 0,
        margin: 0
    },
    bar: {
        width: '100%',
        height: '100%',
        border: 0,
        animation: `a${animationId} 1.2s linear infinite`,
        padding: 0,
        margin: 0
    },
    [`@keyframes a${animationId}`]: {
        '0%': {
            width: '10%',
            marginLeft: '0%'
        },
        '20%': {
            width: '40%',
            marginLeft: '0%'
        },
        '40%': {
            width: '60%',
            marginLeft: '0%'
        },
        '60%': {
            width: '60%',
            marginLeft: '40%'
        },

        '80%': {
            width: '40%',
            marginLeft: '60%'
        },

        '100%': {
            width: '10%',
            marginLeft: '90%'
        }
    }
};
const TextLoader = ({ classes, width, height, marginTop, theme }) => (
    <div
        className={classes.wrapper}
        style={{ width, height, marginTop, background: Theme[theme].backgroundWrapper }}
    >
        <div className={classes.bar} style={{ background: Theme[theme].backgroundBar }} />
    </div>
);

TextLoader.defaultProps = {
    theme: 'primary',
    width: 50,
    height: 5,
    marginTop: 0
};

export default InjectSheet(styles)(TextLoader);
