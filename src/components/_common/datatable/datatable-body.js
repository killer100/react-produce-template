import React from 'react';
import injectSheet from 'react-jss';
import DataTableColumn from './datatable-column';
import classnames from 'classnames';

const styles = {
    td: {
        verticalAlign: 'middle',
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        paddingLeft: 12
    }
};

const DataTableBody = ({ classes, columns, items, loading }) => (
    <tbody>
        {items.length === 0 && (
            <tr>
                <td colSpan={columns.length} className={classnames(classes.td, 'text-center')}>
                    No hay registros
                </td>
            </tr>
        )}
        {items.map((item, index) => (
            <tr key={index}>
                {columns.filter(x => x.show !== false).map((colDefinition, i) => (
                    <DataTableColumn
                        colDefinition={colDefinition}
                        item={item}
                        key={i}
                        loading={loading}
                    />
                ))}
            </tr>
        ))}
    </tbody>
);

export default injectSheet(styles)(DataTableBody);
