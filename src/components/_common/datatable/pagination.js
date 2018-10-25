import React from 'react';
import Pager from 'react-bootstrap/lib/Pagination';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import injectSheet from 'react-jss';

const styles = {
    root: {
        //textAlign: 'right'
    },
    pagination: {
        marginTop: 5,
        marginBottom: 5
    },
    pager: {
        border: 0
    },
    alignRight: { textAlign: 'right' }
};

const buildTotalPages = (total, pageSize) => {
    return Math.ceil(total / pageSize);
};

/*const pageLabel = number => {
  return number;
};*/

const makePage = (number, text, isActive) => {
    return {
        number: number,
        text: text,
        active: isActive
    };
};

const BuildPages = (currentPage, totalPages, maxSize) => {
    let pages = [];
    const rotate = true;
    const boundaryLinkNumbers = false;
    const forceEllipses = true;
    // Default page limits
    let startPage = 1,
        endPage = totalPages;
    const isMaxSized = maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
        if (rotate) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
            endPage = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - maxSize + 1;
            }
        } else {
            // Visible pages are paginated with maxSize
            startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
        }
    }

    // Add page number links
    for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === currentPage);
        pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
        if (startPage > 1) {
            if (!boundaryLinkNumbers || startPage > 3) {
                //need ellipsis for all options unless range is too close to beginning
                const previousPageSet = makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (boundaryLinkNumbers) {
                if (startPage === 3) {
                    //need to replace ellipsis when the buttons would be sequential
                    const secondPageLink = makePage(2, '2', false);
                    pages.unshift(secondPageLink);
                }
                //add the first page
                const firstPageLink = makePage(1, '1', false);
                pages.unshift(firstPageLink);
            }
        }

        if (endPage < totalPages) {
            if (!boundaryLinkNumbers || endPage < totalPages - 2) {
                //need ellipsis for all options unless range is too close to end
                const nextPageSet = makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
            if (boundaryLinkNumbers) {
                if (endPage === totalPages - 2) {
                    //need to replace ellipsis when the buttons would be sequential
                    const secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
                    pages.push(secondToLastPageLink);
                }
                //add the last page
                const lastPageLink = makePage(totalPages, totalPages, false);
                pages.push(lastPageLink);
            }
        }
    }
    return pages;
};

class Pagination extends React.Component {
    handleClick = (page, disabled) => e => {
        if (!disabled && !this.props.disabled) this.props.onChangePage(page);
    };

    render() {
        const { classes, page, pageSize, maxSize, total, disabled } = this.props;

        const totalPages = buildTotalPages(total, pageSize);

        const pageItems = BuildPages(page, totalPages, maxSize);

        return (
            <div className={classes.root}>
                <Row>
                    <Col sm={6}>
                        <div className="pagination-info">
                            Mostrando {(page - 1) * pageSize + 1} a {page * pageSize} de {total}{' '}
                            registros
                        </div>
                    </Col>
                    <Col sm={6} className={classes.alignRight}>
                        <Pager className={classes.pagination}>
                            <Pager.Item
                                onClick={this.handleClick(1, page === 1)}
                                disabled={page === 1 || disabled}
                            >
                                <i className="fa fa-fast-backward" />
                            </Pager.Item>
                            <Pager.Item
                                onClick={this.handleClick(page - 1, page === 1)}
                                disabled={page === 1 || disabled}
                            >
                                <i className="fa fa-step-backward" />
                            </Pager.Item>
                            {pageItems.map(
                                (item, i) =>
                                    item.text === '...' ? (
                                        <Pager.Ellipsis
                                            key={i}
                                            onClick={this.handleClick(
                                                item.number,
                                                page === item.number
                                            )}
                                            disabled={disabled}
                                        />
                                    ) : (
                                        <Pager.Item
                                            key={i}
                                            onClick={this.handleClick(
                                                item.number,
                                                page === item.number
                                            )}
                                            active={item.active}
                                            disabled={disabled}
                                        >
                                            {item.number}
                                        </Pager.Item>
                                    )
                            )}
                            <Pager.Item
                                onClick={this.handleClick(page + 1, page === totalPages)}
                                disabled={page === totalPages || disabled}
                            >
                                <i className="fa fa-step-forward" />
                            </Pager.Item>
                            <Pager.Item
                                onClick={this.handleClick(totalPages, page === totalPages)}
                                disabled={page === totalPages || disabled}
                            >
                                <i className="fa fa-fast-forward" />
                            </Pager.Item>
                        </Pager>
                    </Col>
                </Row>
            </div>
        );
    }
}

Pagination.defaultProps = {
    maxSize: 5,
    disabled: false
};

Pagination.propTypes = {
    disabled: PropTypes.bool,
    maxSize: PropTypes.number,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    total: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default injectSheet(styles)(Pagination);
