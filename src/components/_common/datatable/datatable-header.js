import React from 'react';
import injectSheet from 'react-jss';

const styles = {
    th: {
        paddingTop: '2px!important',
        verticalAlign: 'middle',
        textAlign: 'left!important',
        //borderLeft: 0,
        //borderRight: 0,
        paddingLeft: 12,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
};

const DataTableHeader = ({ classes, columns }) => (
    <thead>
        <tr>
            {columns.filter(x => x.show !== false).map((col, index) => (
                <th key={index} className={classes.th}>
                    {col.label}
                </th>
            ))}
        </tr>
    </thead>
);

export default injectSheet(styles)(DataTableHeader);
