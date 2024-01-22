import React from "react";
import { useState } from "react";

import styled from "styled-components";

import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import DatePickerComponent from "../components/datepicker/DatePicker";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 600px;
    padding: 0 20px;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const DateFilters = ({ startDate, endDate, handleOnSave }: any) => {
    const [startDateLocal, setStartDateLocal] = useState(startDate);
    const [endDateLocal, setEndDateLocal] = useState(endDate);

    return (
        <Container>
            <Paragraph>Расход за период</Paragraph>
            <FlexContainer>
                <div>
                    <span>С:</span>
                    <DatePickerComponent
                        startDate={startDateLocal}
                        onChange={setStartDateLocal}
                    />
                </div>
                <div>
                    <span>По:</span>
                    <DatePickerComponent
                        startDate={endDateLocal}
                        onChange={setEndDateLocal}
                    />
                </div>
                <Button
                    onClick={() =>
                        handleOnSave({
                            startDate: startDateLocal,
                            endDate: endDateLocal,
                        })
                    }>
                    Показать
                </Button>
            </FlexContainer>
        </Container>
    );
};

export default DateFilters;
