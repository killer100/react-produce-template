import React from 'react';
import DatetimePicker from 'react-datetime';
import 'moment/locale/es';

const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-group">
        <input className="form-control" {...props} />
        <span
            className="input-group-addon"
            onClick={() => {
                if (!props.disabled) openCalendar();
            }}
            style={{ cursor: 'pointer' }}
        >
            <span className="fa fa-calendar" />
        </span>
    </div>
);

const Datetime = props => (
    <DatetimePicker
        timeFormat={false}
        closeOnSelect
        dateFormat="DD/MM/YYYY"
        locale="es"
        {...props}
        renderInput={renderInput}
    />
);

export default Datetime;
