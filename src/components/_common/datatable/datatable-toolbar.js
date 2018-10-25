import React from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';

const styles = {
    pageSizer: {
        width: 'auto',
        display: 'inline-block',
        marginTop: 5,
        marginBottom: 5
    }
};

const DatatableToolbar = ({
    classes,
    content,
    pageSize,
    onChangePageSize,
    itemsPerPageOptions,
    disabled
}) => (
    <div className="row">
        <div className="col-md-6">
            <div className="form-inline">
                <label>
                    Mostrar{' '}
                    <select
                        value={pageSize}
                        onChange={onChangePageSize}
                        className={classnames(classes.pageSizer, 'form-control')}
                        disabled={disabled}
                    >
                        {itemsPerPageOptions.map((x, i) => (
                            <option key={i} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>{' '}
                    registros
                </label>
            </div>
        </div>
        <div className="col-md-6">
            <div className="text-right">{content}</div>
        </div>
    </div>
);

DatatableToolbar.propTypes = {};

export default injectSheet(styles)(DatatableToolbar);
