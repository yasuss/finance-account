import React, { useCallback, useState } from "react";
import PureDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ru from "date-fns/locale/ru";
import styled from "styled-components";

import Input from "../Input";
import Day from "./Day";

const DatePickerWrapper = styled.div`
    display: inline-block;
    .react-datepicker-wrapper {
        width: 100%;
    }
    .react-datepicker__day {
        color: palevioletred;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
        background-color: palevioletred;
        color: white;
    }
`;

const DatePickerComponent: React.FC<any> = ({ startDate, onChange }) => {
    const handleChange = useCallback(
        (date: Date, e: React.SyntheticEvent<any, Event>) => {
            onChange(date, e);
        },
        [onChange],
    );

    return (
        <DatePickerWrapper>
            <PureDatePicker
                dateFormat='dd/MM/yyyy'
                locale={ru}
                selected={startDate}
                onChange={handleChange}
                customInput={<Input />}
                renderDayContents={Day}
            />
        </DatePickerWrapper>
    );
};

export default DatePickerComponent;
