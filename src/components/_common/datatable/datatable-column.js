import React from 'react';
import injectSheet from 'react-jss';
import Moment from '../moment';

const styles = {
    td: {
        verticalAlign: 'middle',
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        paddingLeft: 12
    }
};

const getProperty = function(obj, path) {
    return path.split(/(\[|\]|\.)/).reduce(function(x, y) {
        return '[].'.indexOf(y) > -1 ? x : x === Object(x) && y in x ? x[y] : undefined;
    }, obj);
};

const DataTableColumn = ({ classes, colDefinition, item, loading }) => {
    let content = null;
    if (typeof colDefinition.render === 'function') content = colDefinition.render(item, loading);
    else {
        const propValue = getProperty(item, colDefinition.property);
        content = colDefinition.isDate ? (
            <Moment date={propValue} format="DD/MM/YYYY" />
        ) : (
            propValue
        );
    }
    return <td className={classes.td}>{content}</td>;
};

export default injectSheet(styles)(DataTableColumn);
