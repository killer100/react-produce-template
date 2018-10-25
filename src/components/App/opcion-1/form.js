import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import OpenModal from '../../_common/modal';
import Datetime from '../../_common/datetime';
import Select from '../../_common/select';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departamentos: [
                { codigo_departamento: 1, departamento: 'lima' },
                { codigo_departamento: 2, departamento: 'Ancash' },
                { codigo_departamento: 3, departamento: 'Tacna' }
            ],
            provincias: [],
            distritos: [],
            direcciones: [],
            loadingDirecciones: false,
            loadingProvincias: false,
            loadingDistritos: false,
            form: {
                fecha: null,
                nombre: '',
                idPersona: 2,
                idDireccion: 9,
                distrito: 5,
                provincia: 7,
                departamento: 2
            }
        };
    }

    openModal = () => {
        OpenModal({
            component: Form,
            title: 'asdas',
            props: { nombre: 'PRODUCE' }
        });
    };

    submit = () => {
        this.props.showLoading();
        console.log('Enviar form: ', this.state.form);
        setTimeout(() => {
            this.props.hideLoading();
        }, 2000);
    };

    handleChangeDatetime = name => date => {
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: date } });
    };

    handleChangeInput = e => {
        const { form } = this.state;
        this.setState({ form: { ...form, [e.target.name]: e.target.value } });
    };

    handleChangeSelect = name => (val, resetFields) => {
        const { form } = this.state;
        this.setState({ form: { ...form, ...resetFields, [name]: val } });
    };

    loadDirecciones = idPersona => {
        if (!idPersona) {
            this.setState({ direcciones: [] });
        } else {
            const direcciones = {
                '1': [
                    { id: 2, label: 'direccion 1' },
                    { id: 3, label: 'direccion 2' },
                    { id: 4, label: 'direccion 3' }
                ],
                '2': [
                    { id: 7, label: 'direccion 6' },
                    { id: 9, label: 'direccion 7' },
                    { id: 5, label: 'direccion 8' }
                ]
            };

            this.setState({ loadingDirecciones: true });
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(direcciones[idPersona]);
                }, 500);
            }).then(direc => {
                this.setState({ loadingDirecciones: false });
                this.setState({ direcciones: direc });
            });
        }
    };

    loadProvincias = codigo_departamento => {
        this.setState({ provincias: [], distritos: [] });
        if (codigo_departamento) {
            const provincias = {
                '1': [
                    { codigo_provincia: 1, provincia: 'Provincia 1' },
                    { codigo_provincia: 2, provincia: 'Provincia 2' },
                    { codigo_provincia: 3, provincia: 'Provincia 3' }
                ],
                '2': [
                    { codigo_provincia: 7, provincia: 'Provincia 6' },
                    { codigo_provincia: 9, provincia: 'Provincia 7' },
                    { codigo_provincia: 5, provincia: 'Provincia 8' }
                ],
                '3': [
                    { codigo_provincia: 17, provincia: 'Provincia 6' },
                    { codigo_provincia: 19, provincia: 'Provincia 7' },
                    { codigo_provincia: 15, provincia: 'Provincia 8' }
                ]
            };

            this.setState({ loadingProvincias: true });
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(provincias[codigo_departamento]);
                }, 1000);
            }).then(prov => {
                this.setState({ loadingProvincias: false });
                this.setState({ provincias: prov ? prov : [] });
            });
        }
    };

    loadDistritos = codigo_provincia => {
        this.setState({ distritos: [] });
        if (codigo_provincia) {
            const distritos = {
                '1': [
                    { codigo_distrito: 1, distrito: 'Distrito 1' },
                    { codigo_distrito: 2, distrito: 'Distrito 2' },
                    { codigo_distrito: 3, distrito: 'Distrito 3' }
                ],
                '7': [
                    { codigo_distrito: 7, distrito: 'Distrito 6' },
                    { codigo_distrito: 9, distrito: 'Distrito 7' },
                    { codigo_distrito: 5, distrito: 'Distrito 8' }
                ],
                '17': [
                    { codigo_distrito: 17, distrito: 'Distrito 9' },
                    { codigo_distrito: 19, distrito: 'Distrito 10' },
                    { codigo_distrito: 15, distrito: 'Distrito 11' }
                ]
            };

            this.setState({ loadingDistritos: true });
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(distritos[codigo_provincia]);
                }, 600);
            }).then(dist => {
                this.setState({ loadingDistritos: false });
                this.setState({ distritos: dist ? dist : [] });
            });
        }
    };

    componentDidMount() {
        this.loadDirecciones(this.state.form.idPersona);
        this.loadProvincias(this.state.form.departamento);
        this.loadDistritos(this.state.form.provincia);
    }

    render() {
        const {
            form,
            direcciones,
            departamentos,
            provincias,
            distritos,
            loadingDirecciones,
            loadingProvincias,
            loadingDistritos
        } = this.state;
        const { nombre, close, loading } = this.props;
        return (
            <div>
                <Modal.Body>
                    <Datetime
                        onChange={this.handleChangeDatetime('fecha')}
                        value={form.fecha}
                        inputProps={{ disabled: loading }}
                    />

                    <input
                        name="nombre"
                        type="text"
                        className="form-control"
                        onChange={this.handleChangeInput}
                        value={form.nombre}
                        disabled={loading}
                    />

                    <Select
                        options={[{ id: 1, name: 'Juan' }, { id: 2, name: 'Luis' }]}
                        itemLabel="name"
                        itemKey="id"
                        onChange={this.handleChangeSelect('idPersona')}
                        disabled={loading}
                        value={form.idPersona}
                        resetOnChange={['idDireccion']}
                        triggerOnChange={this.loadDirecciones}
                    />

                    <Select
                        options={direcciones}
                        itemLabel="label"
                        itemKey="id"
                        onChange={this.handleChangeSelect('idDireccion')}
                        disabled={loadingDirecciones || loading}
                        value={form.idDireccion}
                    />

                    <Select
                        options={departamentos}
                        itemLabel="departamento"
                        itemKey="codigo_departamento"
                        onChange={this.handleChangeSelect('departamento')}
                        disabled={loading}
                        value={form.departamento}
                        resetOnChange={['provincia', 'distrito']}
                        triggerOnChange={this.loadProvincias}
                    />

                    <Select
                        options={provincias}
                        itemLabel="provincia"
                        itemKey="codigo_provincia"
                        onChange={this.handleChangeSelect('provincia')}
                        disabled={loadingProvincias || loading}
                        value={form.provincia}
                        resetOnChange={['distrito']}
                        triggerOnChange={this.loadDistritos}
                    />

                    <Select
                        options={distritos}
                        itemLabel="distrito"
                        itemKey="codigo_distrito"
                        onChange={this.handleChangeSelect('distrito')}
                        disabled={loadingProvincias || loadingDistritos || loading}
                        value={form.distrito}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="default-custom" onClick={this.submit} disabled={loading}>
                        Submit
                    </Button>
                    <Button bsStyle="default-custom" onClick={this.openModal} disabled={loading}>
                        Open Modal
                    </Button>
                    <Button bsStyle="primary-custom" onClick={close} disabled={loading}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}

export default Form;
