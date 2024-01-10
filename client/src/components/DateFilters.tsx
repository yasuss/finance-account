import React from 'react';
import { useState } from "react";
import styled from "styled-components";

import DatePickerComponent from "../components/datepicker/DatePicker";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const Container = styled.div`
  width: 600px;
  padding: 0 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateFilters = ({ startDate, endDate, handleOnSave }: any) => {
  const [startDateLocal, setStartDateLocal] = useState(startDate);
  const [endDateLocal, setEndDateLocal] = useState(endDate);

  return (
    <Container>
      <div>
        <Paragraph>Расход за период</Paragraph>
      </div>
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
            handleOnSave({ startDate: startDateLocal, endDate: endDateLocal })
          }
        >
          Показать
        </Button>
      </FlexContainer>
    </Container>
  );
};

export default DateFilters;
