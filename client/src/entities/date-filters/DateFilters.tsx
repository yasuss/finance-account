﻿import React from "react";
import { useState } from "react";

import { Button } from "@mui/material";

import Paragraph from "shared/ui/Paragraph";
import DatePickerComponent from "shared/ui/datepicker/DatePicker";

import * as Styled from "./styles";

export const DateFilters = ({ startDate, endDate, handleOnSave }: any) => {
    const [startDateLocal, setStartDateLocal] = useState(startDate);
    const [endDateLocal, setEndDateLocal] = useState(endDate);

    return (
        <Styled.Container>
            <Paragraph>Expenditure for the period</Paragraph>
            <Styled.FlexContainer>
                <div>
                    <span>From:</span>
                    <DatePickerComponent
                        startDate={startDateLocal}
                        onChange={setStartDateLocal}
                    />
                </div>
                <div>
                    <span>To:</span>
                    <DatePickerComponent
                        startDate={endDateLocal}
                        onChange={setEndDateLocal}
                    />
                </div>
                <Button
                    variant='contained'
                    onClick={() =>
                        handleOnSave({
                            startDate: startDateLocal,
                            endDate: endDateLocal,
                        })
                    }>
                    Show
                </Button>
            </Styled.FlexContainer>
        </Styled.Container>
    );
};
