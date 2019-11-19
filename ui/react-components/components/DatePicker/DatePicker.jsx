import React, {useEffect, useState} from 'react';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import {
    appointmentDatePicker,
    appointmentDatePickerNotSelected,
    appointmentDatePickerSelected,
    disable
} from './DatePicker.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AppointmentDatePicker = (props) => {
    const {minDate, defaultValue, onClear, onChange, isDisabled} = props;
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const disablePastDates = (current) => {
        if(minDate)
            return current.isBefore(minDate);
        return current;
    };

    let styles = [appointmentDatePicker];
    value ? styles.push(appointmentDatePickerSelected)
        : styles.push(appointmentDatePickerNotSelected);

    return (
        <div data-testid="datePicker" className={classNames(isDisabled ? disable : '')}>
            <Calendar
                showOk={false}
                showToday={false}
                onClear={onClear}
                disabledDate={disablePastDates}
                className={classNames(styles)}
                dateInputPlaceholder="mm/dd/yyyy"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

AppointmentDatePicker.propTypes = {
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    defaultValue: PropTypes.object,
    minDate: PropTypes.object,
    isDisabled: PropTypes.bool
};

export default AppointmentDatePicker;
