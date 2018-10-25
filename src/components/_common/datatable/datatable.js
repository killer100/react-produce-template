import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
//import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import injectSheet from 'react-jss';
import DataTableHeader from './datatable-header';
import DataTableBody from './datatable-body';
import classnames from 'classnames';
import ProgressBar from '../progress-bar';
import DatatableToolbar from './datatable-toolbar';

const styles = {
    root: {},
    table: {
        border: 0,
        marginBottom: 0
        //boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        //    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        //    0px 2px 1px -1px rgba(0, 0, 0, 0.12)`
    },
    pageSizeChangeText: {
        fontWeight: 'bold'
    },
    '@media screen and (max-width: 767px)': {
        tableResponsive: {
            borderTop: 0
        },
        progressBar: {
            borderTop: '1px solid #ddd',
            borderLeft: '1px solid #ddd',
            borderRight: '1px solid #ddd'
        }
    }
};

class DataTable extends React.Component {
    handleChangePageSize = e => {
        this.props.onChangePageSize(e.target.value);
    };

    render() {
        const {
            classes,
            children,
            tableDef,
            pagination,
            loading,
            onChangePage,
            itemsPerPageOptions
        } = this.props;
        return (
            <div className={classes.root}>
                <DatatableToolbar
                    onChangePageSize={this.handleChangePageSize}
                    content={children}
                    itemsPerPageOptions={itemsPerPageOptions}
                    pageSize={pagination.pageSize}
                    disabled={loading}
                />

                <ProgressBar
                    show={loading}
                    defaultBackgroundPrimary
                    className={classes.progressBar}
                />

                <div className={classnames(classes.tableResponsive, 'table-responsive')}>
                    <table
                        className={classnames(
                            classes.table,
                            'table table-custom table-bordered table-striped'
                        )}
                    >
                        <DataTableHeader columns={tableDef.columns} />
                        <DataTableBody
                            columns={tableDef.columns}
                            items={pagination.items}
                            loading={loading}
                        />
                    </table>
                </div>
                {pagination.total > pagination.pageSize && (
                    <div>
                        <Pagination
                            page={pagination.page}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            disabled={loading}
                            onChangePage={onChangePage}
                        />
                    </div>
                )}
            </div>
        );
    }
}

DataTable.defaultProps = {
    loading: false,
    itemsPerPageOptions: [5, 10, 15, 20, 25]
};

DataTable.propTypes = {
    tableDef: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    onChangePage: PropTypes.func.isRequired,
    onChangePageSize: PropTypes.func.isRequired,
    itemsPerPageOptions: PropTypes.array
};

export default injectSheet(styles)(DataTable);
