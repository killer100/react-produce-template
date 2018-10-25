import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetFields: {}
        };
    }

    handleChange = e => {
        let value = null;
        const { resetFields } = this.state;
        if (e.target.value !== '-1') {
            const { options, itemKey, object } = this.props;
            value = object ? options[e.target.value] : options[e.target.value][itemKey];
        }

        this.props.onChange(value, resetFields);
        if (typeof this.props.triggerOnChange === 'function') this.props.triggerOnChange(value);
    };

    computeValue = (options, object, itemKey, value) => {
        if (!value) return -1;
        return options.findIndex(x => x[itemKey] === (object ? value[itemKey] : value));
    };

    computeResetFields = () => {
        let resetFields = {};
        this.props.resetOnChange.forEach(x => {
            resetFields[x] = this.props.resetValue;
        });
        return resetFields;
    };

    componentDidMount() {
        let resetFields = this.computeResetFields();
        this.setState({ resetFields: resetFields });
    }

    render() {
        const { options, itemLabel, disabled, itemKey, value, object } = this.props;
        const val = this.computeValue(options, object, itemKey, value);

        return (
            <FormControl
                componentClass="select"
                placeholder="seleccione"
                onChange={this.handleChange}
                disabled={disabled}
                value={val}
            >
                <option value={-1}>Seleccione</option>
                {options.map((item, index) => (
                    <option value={index} key={index}>
                        {typeof itemLabel === 'function' ? itemLabel(item) : item[itemLabel]}
                    </option>
                ))}
            </FormControl>
        );
    }
}

Select.defaultProps = {
    object: false,
    disabled: false,
    itemKey: 'value',
    itemLabel: 'label',
    resetOnChange: [],
    resetValue: null
};

export default Select;
