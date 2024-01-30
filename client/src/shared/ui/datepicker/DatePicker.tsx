import React, { useCallback } from "react";
import PureDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TextField } from "@mui/material";
import ru from "date-fns/locale/ru";

import Day from "./Day";
import * as Styled from "./styles";

const DatePickerComponent: React.FC<any> = ({ startDate, onChange }) => {
    const handleChange = useCallback(
        (date: Date, e: React.SyntheticEvent<any, Event>) => {
            onChange(date, e);
        },
        [onChange],
    );

    return (
        <Styled.DatePickerWrapper>
            <PureDatePicker
                dateFormat='dd/MM/yyyy'
                locale={ru}
                selected={startDate}
                onChange={handleChange}
                customInput={<TextField size='small' variant='outlined' />}
                renderDayContents={Day}
            />
        </Styled.DatePickerWrapper>
    );
};

export default DatePickerComponent;
