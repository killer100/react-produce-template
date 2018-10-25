import React from 'react';
import Datatable from '../../_common/datatable';
import OpenModal from '../../_common/modal';
import Form from './form';
import { withRouter } from 'react-router-dom';
import { FetchPosts } from '../../../api/post.api';
import Button from 'react-bootstrap/lib/Button';
import Comments from './comments';

class TableExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                page: 1,
                pageSize: 10,
                total: 0,
                items: []
            },
            tableDef: {
                columns: [
                    {
                        label: 'Título',
                        property: 'title'
                    },
                    {
                        label: 'Contenido',
                        property: 'body'
                    },
                    {
                        label: 'Comentarios',
                        render: item => (
                            <Button bsStyle="link" onClick={this.openComments(item.id)}>
                                Ver
                            </Button>
                        )
                    }
                ]
            }
        };
    }

    openComments = id => e => {
        OpenModal({
            title: 'adas',
            component: Comments,
            props: {
                id: id
            }
        });
    };

    handleClick = item => e => {
        OpenModal({
            title: `modal para ${item.name}`,
            component: Form,
            props: { data: item }
        });
    };

    fetchPosts = async () => {
        try {
            const posts = await FetchPosts();
            this.setState({ pagination: { items: posts, total: posts.length } });
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        this.fetchPosts();
    }

    render() {
        const { tableDef, pagination } = this.state;
        return (
            <div>
                <Datatable
                    tableDef={tableDef}
                    pagination={pagination}
                    onChangePage={page => {
                        console.log(page);
                    }}
                    onChangePageSize={pageSize => {
                        console.log(pageSize);
                    }}
                >
                    <button type="button" className="btn btn-secondary-custom">
                        <i className="fa fa-print" aria-hidden="true" /> Imprimir
                    </button>

                    <button type="button" className="btn btn-secondary-custom">
                        <i className="fa fa-print" aria-hidden="true" /> Imprimir
                    </button>
                </Datatable>
            </div>
        );
    }
}

export default withRouter(TableExample);
